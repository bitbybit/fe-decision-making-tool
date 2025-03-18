import { Component } from '@/ui/component'
import { isHtmlInput } from '@/util/type-guard'

/**
 * Saves the given data as a JSON file
 * @param filename The name for the downloaded file
 * @param data The JSON string to be saved
 */
export function saveDataToJson(filename: string, data: string): void {
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = new Component({ tag: 'a' })

  a.setAttribute('href', url)
  a.setAttribute('download', filename)
  a.getNode().click()

  URL.revokeObjectURL(url)
}

/**
 * Opens a file input dialog to load a JSON file
 * @param accept The accepted file type(s)
 * @returns A promise that resolves with the file content as a string
 */
export function loadDataFromJson(accept: string = 'application/json'): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = new Component({ tag: 'input' })

    input.setAttribute('type', 'file')
    input.setAttribute('accept', accept)

    input.addListener('change', async (event) => {
      if (!isHtmlInput(event.target)) {
        return reject(new Error('Not a valid HTML input element'))
      }

      const file = event.target.files?.[0]

      if (file === undefined) {
        return reject(new Error('No file selected'))
      }

      try {
        const text = await file.text()
        resolve(text)
      } catch {
        reject(new Error('File could not be read'))
      }
    })

    input.getNode().click()
  })
}
