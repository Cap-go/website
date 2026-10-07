import { useRuntimeConfig } from '@/config/app'
import type { CreditStep } from '@/lib/pricingCalculator'
import type { Database } from '@/services/supabase.types'
import type { APIRoute } from 'astro'

export const prerender = true

type Plan = Database['public']['Tables']['plans']['Row']

const TIER_UNITS: Record<string, { title: string; unit: string; plural?: string; amount: (raw: number) => number; format: (value: number) => string }> = {
  mau: { title: 'Monthly active users (MAU)', unit: 'MAU', amount: (raw) => raw, format: (value) => value.toLocaleString('en-US') },
  bandwidth: { title: 'Bandwidth', unit: 'GB', amount: (raw) => raw / 1073741824, format: formatGb },
  storage: { title: 'Storage', unit: 'GB', amount: (raw) => raw / 1073741824, format: formatGb },
  build_time: { title: 'Native build time', unit: 'minute', plural: 'minutes', amount: (raw) => raw / 60, format: (value) => Math.round(value).toLocaleString('en-US') },
}

function formatGb(value: number): string {
  return Number(value.toFixed(value < 10 ? 2 : 0)).toLocaleString('en-US')
}

function usd(value: number): string {
  return `$${Number(value.toFixed(value < 1 ? 5 : 2)).toLocaleString('en-US', { maximumFractionDigits: 5 })}`
}

function renderTiers(credits: CreditStep[], type: string): string {
  const config = TIER_UNITS[type]
  const steps = credits.filter((step) => step.type === type).sort((a, b) => a.step_min - b.step_min)
  if (!config || !steps.length) return ''

  const rows = steps.map((step) => {
    const from = config.format(config.amount(step.step_min))
    const isLast = step.step_max >= Number.MAX_SAFE_INTEGER
    const range = isLast ? `${from}+` : `${from} – ${config.format(config.amount(step.step_max))}`
    // price_per_unit is charged per unit_factor raw units, i.e. per displayed unit (MAU, GB, minute).
    return `| ${range} ${config.plural ?? config.unit} | ${usd(step.price_per_unit)} per ${config.unit} |`
  })

  return [`### ${config.title}`, '', `| Usage above plan allowance | Price |`, '| --- | --- |', ...rows].join('\n')
}

export const GET: APIRoute = async () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl.replace(/\/$/, '')
  const [plansAll, credits]: [Plan[], CreditStep[]] = await Promise.all([
    fetch(`${config.public.baseApiUrl}/private/plans`).then((response) => response.json()),
    fetch(`${config.public.baseApiUrl}/private/credits`).then((response) => response.json()),
  ])

  const plans = plansAll.filter((plan) => plan.name !== 'Free').sort((a, b) => (a.price_m ?? 0) - (b.price_m ?? 0))

  const planRows = plans.map((plan) => {
    const buildMinutes = plan.build_time_unit ? Math.round(plan.build_time_unit / 60).toLocaleString('en-US') : '—'
    const yearlyMonthly = plan.price_y ? `$${Math.round(plan.price_y / 12)}/month ($${plan.price_y.toLocaleString('en-US')}/year)` : '—'
    return `| ${plan.name} | $${plan.price_m}/month | ${yearlyMonthly} | ${(plan.mau ?? 0).toLocaleString('en-US')} | ${(plan.bandwidth ?? 0).toLocaleString('en-US')} GB | ${(plan.storage ?? 0).toLocaleString('en-US')} GB | ${buildMinutes} min |`
  })

  const markdown = [
    '# Capgo pricing',
    '',
    `> Plain-text pricing for LLMs and agents. Human page: ${baseUrl}/pricing/`,
    '',
    'Capgo ships live (OTA) updates and native iOS/Android builds for Capacitor apps.',
    '',
    '- Every plan starts with a 14-day unlimited free trial. No credit card required.',
    '- There is no free plan after the trial.',
    '- Yearly billing is about 20% cheaper than monthly.',
    '- Usage above a plan allowance is billed with the pay-as-you-go tiers below, or you can move to a bigger plan.',
    `- Enterprise (SSO, SLA, SOC 2 Type II, ISO 27001, self-hosting options, custom limits): talk to the team at https://book.capgo.app/demo/ or see ${baseUrl}/enterprise/`,
    '',
    '## Plans',
    '',
    '| Plan | Monthly billing | Yearly billing | Monthly active users | Bandwidth | Storage | Native build time |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...planRows,
    '',
    '## Pay-as-you-go usage tiers',
    '',
    ...['mau', 'bandwidth', 'storage', 'build_time'].map((type) => renderTiers(credits, type)).filter(Boolean).flatMap((block) => [block, '']),
    '## Start',
    '',
    `- Sign up: ${baseUrl}/register/`,
    `- Docs: ${baseUrl}/docs/`,
    `- Full site index for agents: ${baseUrl}/llms.txt`,
    '',
  ].join('\n')

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD',
      Link: `<${baseUrl}/pricing/>; rel="alternate"; type="text/html"`,
    },
  })
}
