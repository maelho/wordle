import { useCallback, useEffect, useMemo, useState } from 'react'
import { NUM_OF_GUESSES_ALLOWED } from '@/constants'
import { WORD_SET } from '@/data'
import { getLetterState } from '@/game-helpers'
import { getRandomWord } from '@/utils'

import GameBanner from './game-banner'
import GuessGrid from './guess-grid'
import GuessInput from './guess-input'

const STORAGE_KEY = 'wordle-game-state'

interface GameState {
  answer: string
  guesses: string[]
  gameStatus: 'running' | 'won' | 'lost'
}

function getStoredGameState(): GameState {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as GameState
      if (parsed.answer && Array.isArray(parsed.guesses) && parsed.gameStatus) {
        return parsed
      }
    } catch {
      // Invalid JSON, create new state
    }
  }
  const newAnswer = getRandomWord(WORD_SET)
  return {
    answer: newAnswer,
    guesses: [],
    gameStatus: 'running',
  }
}

function saveGameState(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(() => getStoredGameState())

  const { answer, guesses, gameStatus } = gameState

  useEffect(() => {
    saveGameState(gameState)
  }, [gameState])

  const handleSubmitGuess = (tentativeGuess: string) => {
    const nextGuesses = [...guesses, tentativeGuess]
    let nextStatus: 'running' | 'won' | 'lost' = 'running'

    if (tentativeGuess.toUpperCase() === answer) {
      nextStatus = 'won'
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      nextStatus = 'lost'
    }

    setGameState({
      answer,
      guesses: nextGuesses,
      gameStatus: nextStatus,
    })
  }

  const letterState = useMemo(() => getLetterState(guesses, answer), [answer, guesses])

  const startNewGame = useCallback(() => {
    const newAnswer = getRandomWord(WORD_SET)
    setGameState({
      answer: newAnswer,
      guesses: [],
      gameStatus: 'running',
    })
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {gameStatus !== 'running' && (
        <GameBanner answer={answer} numOfGuesses={guesses.length} onNewGame={startNewGame} status={gameStatus} />
      )}
      <GuessGrid answer={answer} guesses={guesses} />
      <GuessInput gameStatus={gameStatus} handleSubmitGuess={handleSubmitGuess} letterStatuses={letterState} />
    </div>
  )
}
