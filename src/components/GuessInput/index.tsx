import { type ChangeEvent, type FormEvent, useState } from 'react'

type GuessInputProps = {
  handleSubmitGuess: (guess: string) => void
  gameStatus: 'running' | 'won' | 'lost'
}

export default function GuessInput({ handleSubmitGuess, gameStatus }: GuessInputProps) {
  const [tentativeGuess, setTentativeGuess] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (tentativeGuess.length !== 5) {
      window.alert('Please enter exactly 5 characters. 💖')
      return
    }

    handleSubmitGuess(tentativeGuess)

    setTentativeGuess('')
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextGuess = event.target.value.toLocaleUpperCase()
    setTentativeGuess(nextGuess)
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter Guess</label>
      <input
        disabled={gameStatus !== 'running'}
        id="guess-input"
        maxLength={5}
        minLength={5}
        onChange={handleOnChange}
        required
        type="text"
        value={tentativeGuess}
      />
    </form>
  )
}
