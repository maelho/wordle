export const sample = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

export const range = (start: number, end: number, step: number = 1) => {
  const output = []

  for (let i = start; i < end; i += step) {
    output.push(i)
  }

  return output
}
