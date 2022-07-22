declare const window: any

export const crispLoader = () => {
  if (!window.$crisp) {
    // console.log('Load Crips')
    const config = useRuntimeConfig()
    window.$crisp = []
    window.CRISP_WEBSITE_ID = config.crisp

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
        },
      ])
  }
}

export const openMessenger = () => {
  crispLoader()
  window.$crisp.push(['do', 'chat:show'])
  window.$crisp.push(['do', 'chat:open'])
}
