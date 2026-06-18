import { deriveUsage, getIncludedUsage, getOverageUsage, getPlanMonthlyPrice, recommendPlan, usageToCreditPayload, type PricingPlan } from '@/lib/pricingCalculator'

type CalculatorCopy = {
  includePlan: string
  creditsOnly: string
  includedInPlan: string
  planSubscription: string
}

export type PricingCalculatorConfig = {
  plansJson: string
  apiBaseUrl: string
  copyJson: string
}

export function setupPricingCalculator(config: PricingCalculatorConfig) {
  const plans: PricingPlan[] = JSON.parse(config.plansJson)
  const copy: CalculatorCopy = JSON.parse(config.copyJson)

  const modalElement = document.getElementById('pricing-calculator-modal')
  if (!(modalElement instanceof HTMLDialogElement)) return
  const modal = modalElement

  const openButton = document.querySelector('[data-pricing-calculator-open]')
  const mauInput = document.querySelector('[data-pricing-calculator-mau]')
  const updatesInput = document.querySelector('[data-pricing-calculator-updates]')
  const sizeInput = document.querySelector('[data-pricing-calculator-size]')
  const modeInputs = document.querySelectorAll('[data-pricing-calculator-mode]')
  const planPanel = document.querySelector('[data-pricing-calculator-plan-panel]')
  const planSelect = document.querySelector('[data-pricing-calculator-plan-select]')
  const includedLabel = document.querySelector('[data-pricing-calculator-included-label]')
  const planLineLabel = document.querySelector('[data-pricing-calculator-plan-line-label]')

  if (modal.parentElement !== document.body) {
    document.body.appendChild(modal)
  }

  let debounceTimer: ReturnType<typeof setTimeout> | undefined
  let selectedPlanId: string | null = null
  let userChangedPlan = false

  function formatNumber(num: number) {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(0)}k`
    return Math.round(num).toLocaleString('en-US')
  }

  function formatGiB(num: number) {
    if (num >= 1000) return `${(num / 1000).toFixed(1)} TB`
    if (num >= 10) return `${Math.round(num)} GiB`
    if (num >= 1) return `${num.toFixed(1)} GiB`
    return `${num.toFixed(2)} GiB`
  }

  function formatPrice(price: number) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  function isYearlyBilling() {
    const yearly = document.getElementById('yearly')
    return yearly instanceof HTMLInputElement && yearly.checked
  }

  function includePlanMode() {
    const checked = document.querySelector('[data-pricing-calculator-mode]:checked')
    return checked instanceof HTMLInputElement && checked.value === 'plan'
  }

  function getSelectedPlan(usage: ReturnType<typeof deriveUsage>) {
    if (!includePlanMode()) return null

    if (!userChangedPlan || !selectedPlanId) {
      const recommended = recommendPlan(plans, usage, isYearlyBilling())
      selectedPlanId = recommended.id
      if (planSelect instanceof HTMLSelectElement) planSelect.value = recommended.id
      return recommended
    }

    return plans.find((plan) => plan.id === selectedPlanId) || recommendPlan(plans, usage, isYearlyBilling())
  }

  async function fetchCreditCost(usage: ReturnType<typeof deriveUsage>) {
    const payload = usageToCreditPayload(usage)

    const response = await fetch(`${config.apiBaseUrl}/private/credits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error('Failed to calculate credits')

    const data = await response.json()
    return data.total_cost || 0
  }

  function setText(selector: string, value: string) {
    const element = document.querySelector(selector)
    if (element) element.textContent = value
  }

  async function updateCalculator() {
    const mau = Number(mauInput instanceof HTMLInputElement ? mauInput.value : 0) || 0
    const updatesByMonth = Number(updatesInput instanceof HTMLInputElement ? updatesInput.value : 0) || 0
    const updateSizeMb = Number(sizeInput instanceof HTMLInputElement ? sizeInput.value : 0) || 0
    const usage = deriveUsage(mau, updatesByMonth, updateSizeMb)
    const withPlan = includePlanMode()
    const plan = getSelectedPlan(usage)
    const included = plan ? getIncludedUsage(usage, plan) : { mau: 0, bandwidthGiB: 0, storageGiB: 0 }
    const overage = plan ? getOverageUsage(usage, plan) : usage
    const billableUsage = withPlan ? overage : usage

    if (planPanel instanceof HTMLElement) {
      planPanel.hidden = !withPlan
    }

    if (includedLabel) {
      includedLabel.textContent = withPlan ? copy.includedInPlan : '—'
    }

    if (withPlan && plan) {
      setText('[data-pricing-calculator-plan-name]', plan.name)
      setText('[data-pricing-calculator-plan-price]', `$${formatPrice(getPlanMonthlyPrice(plan, isYearlyBilling()))}/mo`)
    }

    setText('[data-pricing-calculator-usage-mau]', formatNumber(usage.mau))
    setText('[data-pricing-calculator-usage-bandwidth]', formatGiB(usage.bandwidthGiB))
    setText('[data-pricing-calculator-usage-storage]', formatGiB(usage.storageGiB))

    setText('[data-pricing-calculator-included-mau]', withPlan ? formatNumber(included.mau) : '—')
    setText('[data-pricing-calculator-included-bandwidth]', withPlan ? formatGiB(included.bandwidthGiB) : '—')
    setText('[data-pricing-calculator-included-storage]', withPlan ? formatGiB(included.storageGiB) : '—')

    setText('[data-pricing-calculator-overage-mau]', formatNumber(billableUsage.mau))
    setText('[data-pricing-calculator-overage-bandwidth]', formatGiB(billableUsage.bandwidthGiB))
    setText('[data-pricing-calculator-overage-storage]', formatGiB(billableUsage.storageGiB))

    setText('[data-pricing-calculator-plan-line-value]', '...')
    setText('[data-pricing-calculator-credits-value]', '...')
    setText('[data-pricing-calculator-total-value]', '...')

    if (planLineLabel) {
      planLineLabel.textContent = withPlan ? copy.planSubscription : copy.creditsOnly
    }

    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      try {
        const creditsCost = await fetchCreditCost(billableUsage)
        const planCost = withPlan && plan ? getPlanMonthlyPrice(plan, isYearlyBilling()) : 0
        const total = planCost + creditsCost

        setText('[data-pricing-calculator-plan-line-value]', withPlan ? `$${formatPrice(planCost)}` : '$0.00')
        setText('[data-pricing-calculator-credits-value]', `$${formatPrice(creditsCost)}`)
        setText('[data-pricing-calculator-total-value]', `$${formatPrice(total)}`)
      } catch {
        setText('[data-pricing-calculator-credits-value]', '—')
        setText('[data-pricing-calculator-total-value]', '—')
      }
    }, 350)
  }

  function populatePlanSelect() {
    if (!(planSelect instanceof HTMLSelectElement)) return

    planSelect.innerHTML = plans.map((plan) => `<option value="${plan.id}">${plan.name}</option>`).join('')
  }

  function openModal() {
    userChangedPlan = false
    if (!modal.open) {
      modal.showModal()
      document.body.style.overflow = 'hidden'
    }
    updateCalculator()
  }

  function closeModal() {
    if (modal.open) modal.close()
  }

  populatePlanSelect()

  openButton?.addEventListener('click', (event) => {
    event.preventDefault()
    openModal()
  })

  document.querySelectorAll('[data-pricing-calculator-close]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      closeModal()
    })
  })

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

  mauInput?.addEventListener('input', () => {
    userChangedPlan = false
    updateCalculator()
  })
  updatesInput?.addEventListener('input', () => {
    userChangedPlan = false
    updateCalculator()
  })
  sizeInput?.addEventListener('input', () => {
    userChangedPlan = false
    updateCalculator()
  })

  modeInputs.forEach((input) => {
    input.addEventListener('change', () => {
      userChangedPlan = false
      updateCalculator()
    })
  })

  planSelect?.addEventListener('change', () => {
    if (planSelect instanceof HTMLSelectElement) {
      selectedPlanId = planSelect.value
      userChangedPlan = true
      updateCalculator()
    }
  })

  document.getElementById('monthly')?.addEventListener('change', updateCalculator)
  document.getElementById('yearly')?.addEventListener('change', () => {
    userChangedPlan = false
    updateCalculator()
  })

  updateCalculator()

  if (window.location.hash === '#calculator') openModal()

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#calculator') openModal()
  })
}
