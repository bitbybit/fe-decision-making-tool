/**
 * Parse CSV row to an array of values
 * @param line CSV line
 * @returns Array of strings
 */
export function parseCSVLine(line: string): string[] {
  const regex = /^"?(.*?)"?,\s*(-?\d+(\.\d+)?)\s*$/
  const result = regex.exec(line)

  if (result === null) {
    return []
  }

  return result
    .slice(1)
    .filter((value?: string) => typeof value === 'string')
    .map((value) => value.trim())
}
