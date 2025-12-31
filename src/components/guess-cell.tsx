import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type GuessCellProps = {
  letter: string | undefined
  status: 'correct' | 'misplaced' | 'incorrect' | undefined
  index?: number
}

const statusStyles = {
  correct: 'bg-green-500 border-green-700 text-white',
  misplaced: 'bg-yellow-500 border-yellow-700 text-white',
  incorrect: 'bg-muted border-muted-foreground/50 text-foreground',
}

export default function GuessCell({ letter, status, index = 0 }: GuessCellProps) {
  const hasStatus = status !== undefined

  return (
    <motion.div
      animate={
        status === 'correct'
          ? {
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0],
            }
          : hasStatus
            ? { scale: [1, 1.1, 1] }
            : {}
      }
      className={cn(
        'relative flex h-12 w-12 items-center justify-center md:h-14 md:w-14',
        'border-4 border-foreground bg-background',
        'retro font-bold text-lg uppercase md:text-xl',
        status && statusStyles[status],
      )}
      initial={false}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
    >
      {letter}
      {/* 8bit pixel corners */}
      <div className="pointer-events-none absolute -top-1 -left-1 h-1 w-1 bg-background" />
      <div className="pointer-events-none absolute -top-1 -right-1 h-1 w-1 bg-background" />
      <div className="pointer-events-none absolute -bottom-1 -left-1 h-1 w-1 bg-background" />
      <div className="pointer-events-none absolute -right-1 -bottom-1 h-1 w-1 bg-background" />
    </motion.div>
  )
}
