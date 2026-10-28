// Site and API origins per branch. Kept free of heavy imports so client bundles (register form) can use it.
import keys from '../../../../configs.json'

function getRightKey(branch: string, keyname: 'base_domain'): string {
  if (branch === 'development') return keys[keyname].development
  else if (branch === 'local') return keys[keyname].local
  return keys[keyname].prod
}

export function getUrl(branch = ''): string {
  if (branch === 'local') return `http://${getRightKey(branch, 'base_domain')}`
  else if (branch === 'development') return `https://${getRightKey(branch, 'base_domain')}`
  return `https://${getRightKey('prod', 'base_domain')}`
}

function getApiUrlOverride(): string {
  return (import.meta.env.PUBLIC_BASE_API_URL || '').trim().replace(/\/$/, '')
}

export function getApiUrl(branch = ''): string {
  const apiUrlOverride = getApiUrlOverride()
  if (apiUrlOverride) return apiUrlOverride
  if (branch === 'local') return `http://api.${getRightKey(branch, 'base_domain')}`
  else if (branch === 'development') return `https://api.${getRightKey('prod', 'base_domain')}`
  return `https://api.${getRightKey('prod', 'base_domain')}`
}

export function baseDomain(branch = '') {
  if (branch) return getRightKey(branch, 'base_domain')
  return getRightKey('prod', 'base_domain')
}

/** API origin for the current build branch. */
export function getBaseApiUrl(): string {
  return getApiUrl(import.meta.env.BRANCH)
}
