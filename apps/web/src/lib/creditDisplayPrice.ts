import type { CreditStep } from './pricingCalculator'

export function creditDisplayPrice(step: Pick<CreditStep, 'type' | 'price_per_unit' | 'unit_factor'>): number {
  return step.type === 'mau' ? (step.price_per_unit * 1000) / (step.unit_factor || 1) : step.price_per_unit
}
