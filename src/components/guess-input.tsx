import { type ChangeEvent, type FormEvent, useCallback, useState } from "react"

import { Button } from "@/components/ui/8bit/button"
import { Input } from "@/components/ui/8bit/input"
import type { LetterStatus } from "@/game-helpers"

import Keyboard from "./keyboard"

type GuessInputProps = {
  handleSubmitGuess: (guess: string) => void
  gameStatus: "running" | "won" | "lost"
  letterState: Record<string, LetterStatus>
}

export default function GuessInput({
  handleSubmitGuess,
  gameStatus,
  letterState,
}: GuessInputProps) {
  const [tentativeGuess, setTentativeGuess] = useState("")
  const [error, setError] = useState<string | null>(null)

  const isDisabled = gameStatus !== "running"

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    if (tentativeGuess.length !== 5) {
      setError("Please enter exactly 5 characters.")
      return
    }

    setError(null)
    handleSubmitGuess(tentativeGuess)
    setTentativeGuess("")
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextGuess = event.target.value.toLocaleUpperCase()
    setTentativeGuess(nextGuess)
    if (error) {
      setError(null)
    }
  }

  const handleKeyPress = useCallback(
    (key: string) => {
      if (isDisabled) return

      if (key === "ENTER") {
        if (tentativeGuess.length === 5) {
          setError(null)
          handleSubmitGuess(tentativeGuess)
          setTentativeGuess("")
        } else {
          setError("Please enter exactly 5 characters.")
        }
        return
      }

      if (key === "BACK") {
        setTentativeGuess((prev) => prev.slice(0, -1))
        if (error) {
          setError(null)
        }
        return
      }

      // Regular letter key
      if (tentativeGuess.length < 5) {
        setTentativeGuess((prev) => prev + key)
        if (error) {
          setError(null)
        }
      }
    },
    [tentativeGuess, isDisabled, error, handleSubmitGuess],
  )

  return (
    <div className="flex flex-col items-center gap-6">
      <form className="flex flex-col items-center gap-4 px-4" onSubmit={handleSubmit}>
        <label className="retro text-sm text-muted-foreground" htmlFor="guess-input">
          Enter your guess
        </label>
        <div className="flex w-full max-w-xs gap-2">
          <Input
            aria-describedby={error ? "guess-error" : undefined}
            aria-invalid={error ? true : undefined}
            autoComplete="off"
            className="text-center text-lg tracking-widest uppercase"
            disabled={isDisabled}
            id="guess-input"
            maxLength={5}
            minLength={5}
            onChange={handleOnChange}
            required
            type="text"
            value={tentativeGuess}
          />
          <Button disabled={isDisabled} type="submit">
            GO
          </Button>
        </div>
        {error && (
          <p className="retro text-xs text-destructive" id="guess-error" role="alert">
            {error}
          </p>
        )}
      </form>

      <Keyboard disabled={isDisabled} letterState={letterState} onKeyPress={handleKeyPress} />
    </div>
  )
}
