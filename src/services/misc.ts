export function shortNumber(number: number) {
  if (number > 1000000000) return `${(number / 1000000).toFixed(1)}B`
  if (number > 1000000) return `${(number / 1000000).toFixed(1)}M`
  if (number > 1000) return `${(number / 1000).toFixed(1)}k`
  return `${number}`
}

export const renameCat = (text: string) => text.replaceAll('_', ' ')
