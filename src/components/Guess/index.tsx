import { checkGuess } from '../../game-helpers'
import { range } from '../../utils'

function Cell({ letter, status }: { letter: string | undefined; status: string | undefined }) {
  const className = status ? `cell ${status}` : 'cell'

  return <span className={className}>{letter}</span>
}

export default function Guess({ value, answer }: { value: string; answer: string }) {
  const result = checkGuess(value, answer)

  console.log({ result })

  return (
    <p className="guess">
      {range(5).map((num) => (
        <Cell
          key={num}
          letter={result ? result[num].letter : undefined}
          status={result ? result[num].status : undefined}
        />
      ))}
    </p>
  )
}
