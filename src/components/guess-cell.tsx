import { motion } from "motion/react"

import { type LetterStatus, statusStyles } from "@/game-helpers"
import { cn } from "@/lib/utils"

import PixelCorners from "./pixel-corners"

type GuessCellProps = {
  letter: string | undefined
  status: LetterStatus | undefined
  index?: number
}

export default function GuessCell({ letter, status, index = 0 }: GuessCellProps) {
  const hasStatus = status !== undefined

  return (
    <motion.div
      animate={
        status === "correct"
          ? {
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0],
            }
          : hasStatus
            ? { scale: [1, 1.1, 1] }
            : {}
      }
      className={cn(
        "relative flex h-12 w-12 items-center justify-center md:h-14 md:w-14",
        "border-4 border-foreground bg-background",
        "retro text-lg font-bold uppercase md:text-xl",
        status && statusStyles[status],
      )}
      initial={false}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      {letter}
      <PixelCorners />
    </motion.div>
  )
}
