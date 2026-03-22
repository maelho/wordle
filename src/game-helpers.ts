export type LetterStatus = "correct" | "misplaced" | "incorrect"

type ResultItems = {
  letter: string
  status: LetterStatus
}

type LetterCounts = Record<string, number>

export function checkGuess(guess: string, answer: string): ResultItems[] | null {
  if (!guess) {
    return null
  }

  if (guess.length !== answer.length) {
    throw new Error("The guess and answer must be the same length.")
  }

  const guessChars = guess.toUpperCase()
  const answerChars = answer.toUpperCase()

  const result: ResultItems[] = Array.from({ length: guessChars.length })
  const letterCounts: LetterCounts = Object.create(null)

  for (const char of answerChars) {
    letterCounts[char] = (letterCounts[char] || 0) + 1
  }

  // correct letters
  for (let i = 0; i < guess.length; i++) {
    const g = guessChars[i]
    const a = answerChars[i]

    if (guessChars[i] === a) {
      result[i] = { letter: g, status: "correct" }
      letterCounts[g]--
    }
  }

  // misplaced and incorrect letters
  for (let i = 0; i < guess.length; i++) {
    if (result[i]) continue

    const g = guessChars[i]

    if (letterCounts[g] > 0) {
      result[i] = { letter: g, status: "misplaced" }
      letterCounts[g]--
    } else {
      result[i] = { letter: g, status: "incorrect" }
    }
  }

  return result
}

export function getLetterState(guesses: string[], answer: string): Record<string, LetterStatus> {
  const state: Record<string, LetterStatus> = {}

  for (const guess of guesses) {
    const result = checkGuess(guess, answer)
    if (!result) continue

    for (const { letter, status } of result) {
      const currentStatus = state[letter]

      // status: correct > misplaced > incorrect
      if (status === "correct") {
        state[letter] = "correct"
      } else if (status === "misplaced" && currentStatus !== "correct") {
        state[letter] = "misplaced"
      } else if (status === "incorrect" && !currentStatus) {
        state[letter] = "incorrect"
      }
    }
  }

  return state
}

export const statusStyles: Record<LetterStatus, string> = {
  correct: "bg-green-500 border-green-700 text-white",
  misplaced: "bg-yellow-500 border-yellow-700 text-white",
  incorrect: "bg-muted border-muted-foreground/50 text-muted-foreground",
}

export const pixelCornerClasses = [
  "pointer-events-none absolute -top-1 -left-1 h-1 w-1 bg-background",
  "pointer-events-none absolute -top-1 -right-1 h-1 w-1 bg-background",
  "pointer-events-none absolute -bottom-1 -left-1 h-1 w-1 bg-background",
  "pointer-events-none absolute -right-1 -bottom-1 h-1 w-1 bg-background",
] as const
