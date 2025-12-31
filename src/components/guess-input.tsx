import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Button } from '@/components/ui/8bit/button'
import { Input } from '@/components/ui/8bit/input'

type GuessInputProps = {
  handleSubmitGuess: (guess: string) => void
  gameStatus: 'running' | 'won' | 'lost'
}

export default function GuessInput({ handleSubmitGuess, gameStatus }: GuessInputProps) {
  const [tentativeGuess, setTentativeGuess] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (tentativeGuess.length !== 5) {
      setError('Please enter exactly 5 characters.')
      return
    }

    setError(null)
    handleSubmitGuess(tentativeGuess)
    setTentativeGuess('')
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextGuess = event.target.value.toLocaleUpperCase()
    setTentativeGuess(nextGuess)
    if (error) {
      setError(null)
    }
  }

  return (
    <form className="flex flex-col items-center gap-4 px-4" onSubmit={handleSubmit}>
      <label className="retro text-muted-foreground text-sm" htmlFor="guess-input">
        Enter your guess
      </label>
      <div className="flex w-full max-w-xs gap-2">
        <Input
          aria-describedby={error ? 'guess-error' : undefined}
          aria-invalid={error ? true : undefined}
          autoComplete="off"
          className="text-center text-lg uppercase tracking-widest"
          disabled={gameStatus !== 'running'}
          id="guess-input"
          maxLength={5}
          minLength={5}
          onChange={handleOnChange}
          required
          type="text"
          value={tentativeGuess}
        />
        <Button disabled={gameStatus !== 'running'} type="submit">
          GO
        </Button>
      </div>
      {error && (
        <p className="retro text-destructive text-xs" id="guess-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
