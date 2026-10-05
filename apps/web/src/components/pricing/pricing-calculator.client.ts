import { deriveUsage, estimateCost, getPlanMonthlyPrice, recommendPlan, type CreditStep, type PricingPlan } from '@/lib/pricingCalculator'

export type PricingCalculatorData = {
  plans: PricingPlan[]
  steps: CreditStep[]
}

const MAU_STOPS = [
  100, 500, 1_000, 2_000, 5_000, 10_000, 25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 2_000_000, 3_000_000, 5_000_000, 10_000_000, 25_000_000, 50_000_000, 100_000_000,
]
const UPDATE_STOPS = [1, 2, 3, 4, 6, 8, 10, 12, 15, 20, 30, 45, 60]
const SIZE_STOPS = [0.5, 1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 50, 100]

function formatCount(num: number) {
  if (num >= 1_000_000) return `${+(num / 1_000_000).toFixed(1)}M`
  if (num >= 10_000) return `${+(num / 1_000).toFixed(0)}k`
  if (num >= 1_000) return `${+(num / 1_000).toFixed(1)}k`
  return Math.round(num).toLocaleString('en-US')
}

function formatGiB(num: number) {
  if (num >= 1024) return `${+(num / 1024).toFixed(1)} TiB`
  if (num >= 10) return `${Math.round(num).toLocaleString('en-US')} GiB`
  if (num >= 1) return `${num.toFixed(1)} GiB`
  if (num * 1024 >= 1) return `${Math.round(num * 1024)} MiB`
  return `${num.toFixed(2)} GiB`
}

function formatUsd(value: number) {
  const digits = value > 0 && value < 10 && !Number.isInteger(value) ? 2 : 0
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`
}

function nearestStopIndex(stops: number[], value: number) {
  let best = 0
  for (let index = 1; index < stops.length; index += 1) {
    if (Math.abs(stops[index] - value) < Math.abs(stops[best] - value)) best = index
  }
  return best
}

export function setupPricingCalculator({ plans, steps }: PricingCalculatorData) {
  const modalElement = document.getElementById('pricing-calculator-modal')
  if (!(modalElement instanceof HTMLDialogElement)) return
  const modal = modalElement

  if (modal.parentElement !== document.body) document.body.appendChild(modal)

  const all = <T extends Element>(selector: string) => Array.from(modal.querySelectorAll<T>(selector))
  const one = <T extends Element>(selector: string) => modal.querySelector<T>(selector)
  const setText = (selector: string, value: string) => all(selector).forEach((element) => (element.textContent = value))

  // Number field + slider pairs. The slider snaps to stops, the field accepts any value.
  const fields = [
    { input: one<HTMLInputElement>('[data-pricing-calculator-mau]'), range: one<HTMLInputElement>('[data-pricing-calculator-mau-range]'), stops: MAU_STOPS },
    { input: one<HTMLInputElement>('[data-pricing-calculator-updates]'), range: one<HTMLInputElement>('[data-pricing-calculator-updates-range]'), stops: UPDATE_STOPS },
    { input: one<HTMLInputElement>('[data-pricing-calculator-size]'), range: one<HTMLInputElement>('[data-pricing-calculator-size-range]'), stops: SIZE_STOPS },
  ]

  function paintRange(range: HTMLInputElement) {
    const percent = (Number(range.value) / Number(range.max || 1)) * 100
    range.style.background = `linear-gradient(to right, rgb(37 99 235) ${percent}%, rgb(229 231 235) ${percent}%)`
  }

  for (const { input, range, stops } of fields) {
    if (!input || !range) continue
    range.max = String(stops.length - 1)
    range.value = String(nearestStopIndex(stops, Number(input.value) || 0))
    paintRange(range)
    range.addEventListener('input', () => {
      input.value = String(stops[Number(range.value)])
      paintRange(range)
      update()
    })
    input.addEventListener('input', () => {
      range.value = String(nearestStopIndex(stops, Number(input.value) || 0))
      paintRange(range)
      update()
    })
  }

  let userPickedPlan = false

  function isYearly() {
    return one<HTMLInputElement>('[data-pricing-calculator-billing]:checked')?.value === 'yearly'
  }

  function selectedPlanValue() {
    return one<HTMLInputElement>('[data-pricing-calculator-plan]:checked')?.value ?? null
  }

  function checkPlan(value: string) {
    const radio = one<HTMLInputElement>(`[data-pricing-calculator-plan][value="${value}"]`)
    if (radio) radio.checked = true
  }

  function update() {
    const [mau, updates, size] = fields.map(({ input }) => Math.max(0, Number(input?.value) || 0))
    const usage = deriveUsage(mau, updates, size)
    const yearly = isYearly()
    const recommended = plans.length ? recommendPlan(plans, steps, usage, yearly) : null

    if (!userPickedPlan && recommended) checkPlan(recommended.id)
    const value = selectedPlanValue()
    const plan = value && value !== 'credits' ? (plans.find((candidate) => candidate.id === value) ?? null) : null
    const estimate = estimateCost(steps, usage, plan, yearly)

    for (const candidate of plans) {
      setText(`[data-pricing-calculator-plan-price="${candidate.id}"]`, formatUsd(Math.round(getPlanMonthlyPrice(candidate, yearly))))
      all<HTMLElement>(`[data-pricing-calculator-best-fit="${candidate.id}"]`).forEach((badge) => (badge.hidden = candidate.id !== recommended?.id))
    }

    setText('[data-pricing-calculator-total]', steps.length || !plan ? formatUsd(estimate.totalMonthly) : '—')
    setText('[data-pricing-calculator-plan-name]', plan?.name ?? '')
    setText('[data-pricing-calculator-plan-cost]', formatUsd(estimate.planMonthly))
    setText('[data-pricing-calculator-credits]', steps.length ? formatUsd(estimate.creditsMonthly) : '—')
    all<HTMLElement>('[data-pricing-calculator-plan-row]').forEach((row) => (row.hidden = !plan))
    all<HTMLElement>('[data-pricing-calculator-yearly-note]').forEach((note) => (note.hidden = !(plan && yearly)))
    all<HTMLElement>('[data-pricing-calculator-credits-note]').forEach((note) => (note.hidden = !!plan))

    const rows = [
      { key: 'mau', used: usage.mau, included: plan?.mau ?? 0, format: formatCount },
      { key: 'bandwidth', used: usage.bandwidthGiB, included: plan?.bandwidth ?? 0, format: formatGiB },
      { key: 'storage', used: usage.storageGiB, included: plan?.storage ?? 0, format: formatGiB },
    ]
    for (const row of rows) {
      const element = one<HTMLElement>(`[data-pricing-calculator-usage="${row.key}"]`)
      if (!element) continue
      const over = Math.max(0, row.used - row.included)
      const fill = row.included > 0 ? Math.min(100, (row.used / row.included) * 100) : row.used > 0 ? 100 : 0
      const bar = element.querySelector<HTMLElement>('[data-usage-bar]')
      if (bar) {
        bar.style.width = `${fill}%`
        bar.classList.toggle('bg-amber-500', over > 0)
        bar.classList.toggle('bg-blue-600', over === 0)
      }
      const used = element.querySelector('[data-usage-used]')
      if (used) used.textContent = row.format(row.used)
      const included = element.querySelector('[data-usage-included]')
      if (included) included.textContent = row.format(row.included)
      const includedWrap = element.querySelector<HTMLElement>('[data-usage-included-wrap]')
      if (includedWrap) includedWrap.hidden = !plan
      const overLine = element.querySelector<HTMLElement>('[data-usage-over]')
      if (overLine) overLine.hidden = over <= 0
      const overValue = element.querySelector('[data-usage-over-value]')
      if (overValue) overValue.textContent = `+${row.format(over)}`
    }
  }

  function syncBillingFromPage() {
    const pageYearly = document.getElementById('yearly')
    const yearly = pageYearly instanceof HTMLInputElement && pageYearly.checked
    all<HTMLInputElement>('[data-pricing-calculator-billing]').forEach((input) => (input.checked = input.value === (yearly ? 'yearly' : 'monthly')))
  }

  function openModal(options?: { creditsOnly?: boolean }) {
    userPickedPlan = !!options?.creditsOnly
    if (options?.creditsOnly) checkPlan('credits')
    syncBillingFromPage()
    if (!modal.open) {
      modal.showModal()
      document.body.style.overflow = 'hidden'
    }
    update()
  }

  function closeModal() {
    if (modal.open) modal.close()
  }

  document.querySelector('[data-pricing-calculator-open]')?.addEventListener('click', (event) => {
    event.preventDefault()
    openModal()
  })
  document.querySelector('[data-pricing-calculator-open-credits]')?.addEventListener('click', (event) => {
    event.preventDefault()
    openModal({ creditsOnly: true })
  })
  all('[data-pricing-calculator-close]').forEach((button) =>
    button.addEventListener('click', (event) => {
      event.preventDefault()
      closeModal()
    }),
  )
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal()
  })
  modal.addEventListener('close', () => {
    document.body.style.overflow = ''
  })
  modal.addEventListener('cancel', (event) => {
    event.preventDefault()
    closeModal()
  })

  all<HTMLInputElement>('[data-pricing-calculator-plan]').forEach((input) =>
    input.addEventListener('change', () => {
      userPickedPlan = true
      update()
    }),
  )
  all<HTMLInputElement>('[data-pricing-calculator-billing]').forEach((input) => input.addEventListener('change', update))

  update()

  const openFromHash = () => {
    if (window.location.hash === '#calculator') openModal()
    if (window.location.hash === '#calculator-credits') openModal({ creditsOnly: true })
  }
  openFromHash()
  window.addEventListener('hashchange', openFromHash)
}
