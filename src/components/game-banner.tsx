import { motion } from "motion/react"

import { Button } from "@/components/ui/8bit/button"
import { Card, CardContent } from "@/components/ui/8bit/card"
import { cn } from "@/lib/utils"

type GameBannerProps = {
  status: "won" | "lost"
  answer: string
  numOfGuesses?: number
  onNewGame: () => void
}

export default function GameBanner({ status, answer, numOfGuesses, onNewGame }: GameBannerProps) {
  const isWon = status === "won"

  return (
    <motion.div
      animate={
        isWon
          ? {
              scale: [0, 1.1, 1],
              rotate: [0, -3, 3, 0],
            }
          : {
              x: [0, -10, 10, -10, 10, 0],
              scale: [0, 1],
            }
      }
      initial={{ scale: 0, opacity: 0 }}
      transition={{
        duration: isWon ? 0.5 : 0.4,
        ease: "easeOut",
      }}
      whileInView={{ opacity: 1 }}
    >
      <Card className={cn("mx-auto max-w-md", isWon ? "border-green-500" : "border-red-500")}>
        <CardContent className="p-4 text-center">
          {isWon ? (
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              className="text-sm md:text-base"
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
            >
              <span className="text-green-500">Congratulations!</span>
              Got it in{" "}
              <strong>{numOfGuesses === 1 ? "1 guess" : `${numOfGuesses} guesses`}</strong>
            </motion.p>
          ) : (
            <p className="text-sm md:text-base">
              <span className="text-red-500">Game Over!</span>
              The answer was <strong className="uppercase">{answer}</strong>
            </p>
          )}
          <Button className="mt-4" onClick={onNewGame} variant="outline">
            New Game
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
