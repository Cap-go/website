type InstallTabMode = 'web' | 'docs'

export function bindTailwindCapacitorInstallTabs(root: HTMLElement, mode: InstallTabMode) {
  const setWebTabStyle = (btn: HTMLButtonElement, active: boolean) => {
    btn.setAttribute('aria-selected', String(active))
    btn.classList.toggle('border-blue-400/40', active)
    btn.classList.toggle('text-white', active)
    btn.classList.toggle('border-white/15', !active)
    btn.classList.toggle('text-gray-300', !active)
  }

  const setDocsTabStyle = (btn: HTMLButtonElement, active: boolean) => {
    btn.classList.toggle('selected', active)
    btn.setAttribute('aria-selected', String(active))
  }

  const setActive = mode === 'web' ? setWebTabStyle : setDocsTabStyle

  root.querySelectorAll('[data-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = (tab as HTMLButtonElement).dataset.tab
      if (!id) return
      root.querySelectorAll('[data-tab]').forEach((btn) => {
        setActive(btn as HTMLButtonElement, (btn as HTMLButtonElement).dataset.tab === id)
      })
      root.querySelectorAll('[data-panel]').forEach((panel) => {
        panel.classList.toggle('hidden', (panel as HTMLElement).dataset.panel !== id)
      })
    })
  })
}
