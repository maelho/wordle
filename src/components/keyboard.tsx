import { statusStyles, type LetterStatus } from '@/game-helpers'
import { cn } from '@/lib/utils'
import PixelCorners from './pixel-corners'

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
]

type KeyboardProps = {
  letterStatuses: Record<string, LetterStatus>
  onKeyPress: (key: string) => void
  disabled?: boolean
}

export default function Keyboard({ letterStatuses, onKeyPress, disabled = false }: KeyboardProps) {
  const handleKeyClick = (key: string) => {
    if (disabled) return
    onKeyPress(key)
  }

  return (
    <div className="flex flex-col items-center gap-1.5 px-2">
      {KEYBOARD_ROWS.map((row) => (
        <div className="flex justify-center gap-1 md:gap-1.5" key={row.join('')}>
          {row.map((key) => {
            const status = letterStatuses[key]
            const isSpecialKey = key === 'ENTER' || key === 'BACK'

            return (
              <button
                className={cn(
                  'relative flex items-center justify-center',
                  'border-4 border-foreground bg-secondary',
                  'retro font-bold text-xs uppercase md:text-sm',
                  'transition-transform active:scale-95',
                  'hover:bg-secondary/80',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  isSpecialKey ? 'h-10 w-14 px-1 text-[10px] md:h-12 md:w-16 md:text-xs' : 'h-10 w-8 md:h-12 md:w-10',
                  status && statusStyles[status],
                  status && 'hover:brightness-110',
                )}
                disabled={disabled}
                key={key}
                onClick={() => handleKeyClick(key)}
                type="button"
              >
                {key === 'BACK' ? '⌫' : key}
                <PixelCorners />
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
