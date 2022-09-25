/**
 * Limit a list to a size, FIFO
 */
export class RecentQueue<T> {
  private readonly queue: T[] = []
  private readonly limit: number

  constructor(limit: number) {
    this.limit = limit
  }

  add(value: T): void {
    this.queue.unshift(value)
    if (this.queue.length > this.limit) this.queue.pop()
  }

  values(): T[] {
    return this.queue
  }
}
