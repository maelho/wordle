import { useState } from 'react'
import { NUM_OF_GUESSES_ALLOWED } from '../../constants'
import { WORDS } from '../../data'
import { sample } from '../../utils'

import GuessInput from '../GuessInput'
import GuessResults from '../GuessResults'
import LostBanner from '../LostBanner'
import WonBanner from '../WonBanner'

const answer = sample(WORDS)
console.log({ answer })

export default function Game() {
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
    <>
      <GuessResults answer={answer} guesses={guesses} />
      <GuessInput gameStatus={gameStatus} handleSubmitGuess={handleSubmitGuess} />
      {gameStatus === 'won' && <WonBanner numOfGuesses={guesses.length} />}
      {gameStatus === 'lost' && <LostBanner answer={answer} />}
    </>
  )
}
