export type BackgroundContext = {
  waitUntil(promise: Promise<unknown>): void
}
