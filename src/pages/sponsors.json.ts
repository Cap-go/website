import { webJson } from '@/services/responses'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  // remove isActive if you also want to include past sponsors
  const query = `
    query {
      riderx: user(login: "riderx") {
        sponsorshipsAsMaintainer(first: 100) {
          nodes {
            sponsorEntity {
              ... on User {
                login
                name
                url
                avatarUrl
              }
              ... on Organization {
                login
                avatarUrl
                url
                name
              }
            }
            isActive
            tier {
              monthlyPriceInDollars
            }
          }
        }
      }
      capgo: organization(login: "Cap-go") {
        sponsorshipsAsMaintainer(first: 100) {
          nodes {
            sponsorEntity {
              ... on User {
                login
                name
                avatarUrl
                url
              }
              ... on Organization {
                login
                avatarUrl
                url
                name
              }
            }
            isActive
            tier {
              monthlyPriceInDollars
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.PERSONAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    })
    const data = await response.json()
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      return webJson([], 500)
    }
    const riderxNodes = data?.data?.riderx?.sponsorshipsAsMaintainer?.nodes || []
    const capgoNodes = data?.data?.capgo?.sponsorshipsAsMaintainer?.nodes || []
    const allSponsors = [...riderxNodes, ...capgoNodes]
    // console.log('allSponsors', allSponsors)
    const calculateTier = (sponsorship: any) => {
      const tier = sponsorship?.tier?.monthlyPriceInDollars ?? 0
      if (tier >= 100) {
        return 'platinum'
      } else if (tier >= 50) {
        return 'gold'
      } else if (tier >= 25) {
        return 'silver'
      } else {
        return 'baker'
      }
    }
    const sponsors = allSponsors.map((sponsorship) => {
      const sponsor = sponsorship.sponsorEntity
      return {
        id: sponsor.login,
        name: sponsor.name || sponsor.login,
        imageUrl: sponsor.avatarUrl,
        url: sponsor.url,
        tier: calculateTier(sponsorship),
      }
    })
    return webJson(sponsors)
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return webJson([], 500)
  }
}
