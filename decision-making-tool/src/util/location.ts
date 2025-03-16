/**
 * Get current URL path
 * @returns Path
 */
export function getPath(): string {
  return globalThis.location.hash.slice(1) || '/'
}
