#!/usr/bin/env node

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const token = process.env.CLOUDFLARE_API_TOKEN

if (!accountId || !token) {
  console.error('CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required')
  process.exit(1)
}

const res = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/capgo-website/subdomain`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ enabled: false, previews_enabled: true }),
  },
)

const json = await res.json()
if (!json.success) {
  console.error(JSON.stringify(json.errors ?? json))
  process.exit(1)
}

console.log(JSON.stringify(json.result))