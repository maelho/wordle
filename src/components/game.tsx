import { useMemo, useState } from 'react'
import { NUM_OF_GUESSES_ALLOWED } from '@/constants'
import { WORD_SET } from '@/data'
import { getRandomWord } from '@/utils'

import GameBanner from './game-banner'
import GuessGrid from './guess-grid'
import GuessInput from './guess-input'

export default function Game() {
  const answer = useMemo(() => getRandomWord(WORD_SET), [])

  const [gameStatus, setGameStatus] = useState<'running' | 'won' | 'lost'>('running')
  const [guesses, setGuesses] = useState<string[]>([])

  const handleSubmitGuess = (tentativeGuess: string) => {
    const nextGuesses = [...guesses, tentativeGuess]
    setGuesses(nextGuesses)

    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus('won')
    } else if (guesses.length + 1 >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {gameStatus !== 'running' && <GameBanner answer={answer} numOfGuesses={guesses.length} status={gameStatus} />}
      <GuessGrid answer={answer} guesses={guesses} />
      <GuessInput gameStatus={gameStatus} handleSubmitGuess={handleSubmitGuess} />
    </div>
  )
}
