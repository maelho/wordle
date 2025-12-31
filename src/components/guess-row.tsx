import { useMemo } from 'react'
import { checkGuess } from '@/game-helpers'
import { range } from '@/utils'
import GuessCell from './guess-cell'

type GuessRowProps = {
  value: string | undefined
  answer: string
}

export default function GuessRow({ value, answer }: GuessRowProps) {
  const result = useMemo(() => (value ? checkGuess(value, answer) : null), [value, answer])

  return (
    <div className="flex justify-center gap-1 md:gap-2">
      {range(5).map((index) => (
        <GuessCell
          index={index}
          key={index}
          letter={result ? result[index].letter : undefined}
          status={result ? result[index].status : undefined}
        />
      ))}
    </div>
  )
}
