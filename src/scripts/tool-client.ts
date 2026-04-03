export interface DownloadableFile {
  fileName: string
  mimeType: string
  encoding: 'text' | 'base64'
  content: string
}

export function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

export function decodeBase64ToBlob(base64: string, mimeType: string): Blob {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return new Blob([bytes], { type: mimeType })
}

export function downloadFile(file: DownloadableFile): void {
  const blob = file.encoding === 'base64' ? decodeBase64ToBlob(file.content, file.mimeType) : new Blob([file.content], { type: file.mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = file.fileName
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

export async function postJson<TResponse>(url: string, body: Record<string, unknown>): Promise<TResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message = payload && typeof payload.error === 'string' ? payload.error : 'The request failed. Please review your values and try again.'
    throw new Error(message)
  }

  if (payload === null) {
    throw new Error('The server returned an empty or invalid JSON response.')
  }

  return payload as TResponse
}
