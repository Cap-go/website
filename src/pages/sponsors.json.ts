import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
  
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
        Authorization: `Bearer ${import.meta.env.BEARER_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      return new Response(JSON.stringify([]), { status: 500 })
    }

    const allSponsors = [...(data.data.riderx?.sponsorshipsAsMaintainer.nodes || []), ...(data.data.capgo?.sponsorshipsAsMaintainer.nodes || [])]

    const sponsors = allSponsors
      .filter((sponsorship) => sponsorship.isActive && sponsorship.tier.monthlyPriceInDollars >= 100)
      .map((sponsorship) => {
        const sponsor = sponsorship.sponsorEntity
        return {
          id: sponsor.login,
          name: sponsor.name || sponsor.login,
          imageUrl: sponsor.avatarUrl,
          url: sponsor.url,
        }
      })

    return new Response(JSON.stringify(sponsors), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return new Response(JSON.stringify([]), { status: 500 })
  }
}
