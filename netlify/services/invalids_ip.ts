const ipapi = async (ip: string, lang = 'en') => {
  ip = ip || ''
  lang = lang || 'en'

  const langs = ['en', 'de', 'es', 'pt-BR', 'fr', 'ja', 'zh-CN', 'ru']

  if (!langs.includes(lang))
    throw new Error(`unknown language, supported ones are: ${langs.join(', ')}`)

  const data = await fetch(`http://ip-api.com/json/${ip}?lang=${lang}&fields=66842623`)

  return data.json()
}
export const invalidIps = async (ips: string[]) => {
  // check all ip an return true if one is from google
  for (const ip of ips) {
    const res = await ipapi(ip)
    if (res.isp.toLowerCase().includes('google'))
      return true
  }
  return false
}
export const invalidIp = async (ip: string) => {
  // check all ip an return true if one is from google
  const res = await ipapi(ip)
  if (res.isp.toLowerCase().includes('google'))
    return true
  return false
}
// const main = async () => {
//   console.log('invalidIp', await invalidIp(['34.138.199.110', '34.75.111.56', '66.102.8.118']))
// }
// main()
