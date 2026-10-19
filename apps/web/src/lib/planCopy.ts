import m from '@/copy/messages'
import type { Locales } from '@/services/locale'
import type { Database } from '@/services/supabase.types'

type PlanRow = Database['public']['Tables']['plans']['Row']

export function planDescriptionToText(description: string | null | undefined, locale: Locales): string {
  if (!description) return ''

  switch (description) {
    case 'plan.solo.desc':
    case 'plan_solo_desc':
      return m.plan_solo_desc({}, { locale })
    case 'plan.maker.desc':
    case 'plan_maker_desc':
      return m.plan_maker_desc({}, { locale })
    case 'plan.team.desc':
    case 'plan_team_desc':
      return m.plan_team_desc({}, { locale })
    case 'plan.payasyougo.desc':
    case 'plan.pay_as_you_go.desc':
    case 'plan_payasyougo_desc':
      return m.plan_payasyougo_desc({}, { locale })
    default:
      return description
  }
}

export function planMonthlyPrice(plan: PlanRow): number {
  return typeof plan.price_m === 'number' && Number.isFinite(plan.price_m) ? plan.price_m : 0
}

export function planYearlyPrice(plan: PlanRow): number {
  return typeof plan.price_y === 'number' && Number.isFinite(plan.price_y) ? plan.price_y : 0
}
