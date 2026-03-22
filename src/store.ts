import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { NUM_OF_GUESSES_ALLOWED } from "@/constants";
import { WORD_SET } from "@/data";
import { getLetterState, type LetterStatus } from "@/game-helpers";
import { getRandomWord } from "@/utils";

export type GameStatus = "running" | "won" | "lost";

export interface GameState {
  answer: string;
  guesses: string[];
  gameStatus: GameStatus;
}

const STORAGE_KEY = "wordle-game-state";

function createInitialState(): GameState {
  return {
    answer: getRandomWord(WORD_SET),
    guesses: [],
    gameStatus: "running",
  };
}

export const gameStateAtom = atomWithStorage<GameState>(STORAGE_KEY, createInitialState());

export const answerAtom = atom((get) => get(gameStateAtom).answer);
export const guessesAtom = atom((get) => get(gameStateAtom).guesses);
export const gameStatusAtom = atom((get) => get(gameStateAtom).gameStatus);

export const letterStateAtom = atom<Record<string, LetterStatus>>((get) => {
  const { guesses, answer } = get(gameStateAtom);
  return getLetterState(guesses, answer);
});

export const numGuessesAtom = atom((get) => get(gameStateAtom).guesses.length);

export const submitGuessAtom = atom(null, (get, set, tentativeGuess: string) => {
  const currentState = get(gameStateAtom);
  const { answer, guesses, gameStatus } = currentState;

  if (gameStatus !== "running") return;

  const nextGuesses = [...guesses, tentativeGuess];
  let nextStatus: GameStatus = "running";

  if (tentativeGuess.toUpperCase() === answer) {
    nextStatus = "won";
  } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
    nextStatus = "lost";
  }

  set(gameStateAtom, {
    answer,
    guesses: nextGuesses,
    gameStatus: nextStatus,
  });
});

export const startNewGameAtom = atom(null, (_get, set) => {
  const newAnswer = getRandomWord(WORD_SET);
  set(gameStateAtom, {
    answer: newAnswer,
    guesses: [],
    gameStatus: "running",
  });
});
