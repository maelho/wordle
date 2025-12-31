type ResultItems = {
  letter: string
  status: 'correct' | 'misplaced' | 'incorrect'
}

type LetterCounts = Record<string, number>

export function checkGuess(guess: string, answer: string): ResultItems[] | null {
  console.log({ answer })

  if (!guess) {
    return null
  }

  if (guess.length !== answer.length) {
    throw new Error('The guess and answer must be the same length.')
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
      result[i] = { letter: g, status: 'correct' }
      letterCounts[g]--
    }
  }

  // misplaced and incorrect letters
  for (let i = 0; i < guess.length; i++) {
    if (result[i]) continue

    const g = guessChars[i]

    if (letterCounts[g] > 0) {
      result[i] = { letter: g, status: 'misplaced' }
      letterCounts[g]--
    } else {
      result[i] = { letter: g, status: 'incorrect' }
    }
  }

  return result
}
