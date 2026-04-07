export const shortNumber = (number: number) => {
  if (number > 1000000000) return `${(number / 1000000).toFixed(1)}B`
  if (number > 1000000) return `${(number / 1000000).toFixed(1)}M`
  if (number > 1000) return `${(number / 1000).toFixed(1)}K`
  return `${number}`
}

export const renameCat = (text: string) => text.replaceAll('_', ' ')

export const updateCalc = (plan: any) => plan.mau * 20

export const numberWithSpaces = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const toTb = (value: number) => (value / 1000).toFixed(2).toLocaleString()

export const roundNumber = (number: number) => Math.round(number * 100) / 100
