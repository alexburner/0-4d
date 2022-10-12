/**
 * Shuffle array in place
 * https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
 */
export const shuffle = (list: unknown[]): void => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const x = list[i]
    list[i] = list[j]
    list[j] = x
  }
}

/**
 * ~50% probability boolean
 */
export const coinFlip = (): boolean => Boolean(Math.round(Math.random()))
