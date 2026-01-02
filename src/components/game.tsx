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
    <div className="relative">
      {gameStatus !== 'running' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 lg:inset-auto lg:top-1/2 lg:right-full lg:mr-6 lg:-translate-y-1/2 lg:bg-transparent lg:backdrop-blur-none">
          <GameBanner answer={answer} numOfGuesses={guesses.length} onNewGame={startNewGame} status={gameStatus} />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <GuessGrid answer={answer} guesses={guesses} />
        <GuessInput gameStatus={gameStatus} handleSubmitGuess={submitGuess} letterState={letterState} />
      </div>
    </div>
  )
}
