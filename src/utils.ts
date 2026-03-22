export const getRandomWord = (words: readonly string[]) => {
  const index = Math.floor(Math.random() * words.length)
  return words[index]
}

export const range = (start: number = 0, end?: number, step: number = 1) => {
  if (end === undefined) {
    end = start
    start = 0
  }

  const length = Math.max(Math.ceil((end - start) / step), 0)

  return Array.from({ length }, (_, i) => start + i * step)
}
