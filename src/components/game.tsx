import { useAtomValue, useSetAtom } from 'jotai'
import { answerAtom, gameStatusAtom, guessesAtom, letterStateAtom, startNewGameAtom, submitGuessAtom } from '@/store'

import GameBanner from './game-banner'
import GuessGrid from './guess-grid'
import GuessInput from './guess-input'

export default function Game() {
  const answer = useAtomValue(answerAtom)
  const guesses = useAtomValue(guessesAtom)
  const gameStatus = useAtomValue(gameStatusAtom)
  const letterState = useAtomValue(letterStateAtom)

  const submitGuess = useSetAtom(submitGuessAtom)
  const startNewGame = useSetAtom(startNewGameAtom)

  return (
    <div className="flex flex-col gap-6">
      {gameStatus !== 'running' && (
        <GameBanner answer={answer} numOfGuesses={guesses.length} onNewGame={startNewGame} status={gameStatus} />
      )}
      <GuessGrid answer={answer} guesses={guesses} />
      <GuessInput gameStatus={gameStatus} handleSubmitGuess={submitGuess} letterState={letterState} />
    </div>
  )
}
