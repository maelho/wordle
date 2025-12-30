export const sample = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

export const range = (start: number = 0, end?: number, step: number = 1) => {
  if (end === undefined) {
    end = start
    start = 0
  }

  const length = Math.max(Math.ceil((end - start) / step), 0)

  return Array.from({ length }, (_, i) => start + i * step)
}
