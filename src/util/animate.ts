/**
 * Provides an "ease-in-out" effect
 * @param t time
 * @returns Result
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
