declare global {
  interface Window {
    Rewardful: any
    $crisp: unknown[]
    CRISP_RUNTIME_CONFIG: {
      lock_maximized: boolean
      lock_full_view: boolean
      cross_origin_cookies: boolean
    }
    CRISP_READY_TRIGGER: () => void
    pushToCrisp: (data: string) => void
    CRISP_WEBSITE_ID: string
    CRISP_TOKEN_ID: string
  }
}

export function crispLoader() {
  if (!window.$crisp) {
    // console.log('Load Crips')
    const config = useRuntimeConfig()
    window.$crisp = []
    window.CRISP_WEBSITE_ID = config.public.crisp

    const d = document
    const s = d.createElement('script')

    s.src = 'https://client.crisp.chat/l.js'
    s.async = true
    d.getElementsByTagName('head')[0].appendChild(s)

    // Hide the Crisp widget
    window.$crisp.push(['safe', true],
      ['do', 'chat:hide'],
      [
        'on',
        'chat:closed',
        () => {
          window.$crisp.push(['do', 'chat:hide'])
        },
      ],
      [
        'on',
        'message:received',
        () => {
          window.$crisp.push(['do', 'chat:show'])
          window.$crisp.push(['do', 'chat:open'])
        },
      ])
  }
}

export function openMessenger() {
  crispLoader()
  window.$crisp.push(['do', 'chat:show'])
  window.$crisp.push(['do', 'chat:open'])
}
