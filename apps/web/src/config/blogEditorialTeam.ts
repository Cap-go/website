export type EditorialRole = 'writer' | 'reviewer' | 'editor'

export const MARTIN_PROFILE_URL = 'https://x.com/martindonadieu'
export const VALERIA_PROFILE_URL = 'https://www.instagram.com/valeria.pitiakova/'
export const JORDAN_PROFILE_URL = 'https://www.instagram.com/jordanlorho/'

/** Canonical profile links for team authors; overrides per-post `author_url` frontmatter. */
const TEAM_AUTHOR_PROFILE_URLS: Record<string, string> = {
  'Martin Donadieu': MARTIN_PROFILE_URL,
  Valeria: VALERIA_PROFILE_URL,
  Jordan: JORDAN_PROFILE_URL,
}

export const resolveAuthorUrl = (author: string | undefined, fallback: string): string => (author && TEAM_AUTHOR_PROFILE_URLS[author]) || fallback

export interface EditorialTeamMember {
  name: string
  role: EditorialRole
  imageUrl: string
  profileUrl?: string
}

/** Default editorial credits for human-written blog articles. */
export const HUMAN_EDITORIAL_TEAM: EditorialTeamMember[] = [
  {
    name: 'Martin Donadieu',
    role: 'writer',
    imageUrl: 'https://avatars.githubusercontent.com/u/4084527?v=4',
    profileUrl: MARTIN_PROFILE_URL,
  },
  {
    name: 'Valeria',
    role: 'reviewer',
    imageUrl: '/valeria-avatar.jpg',
    profileUrl: VALERIA_PROFILE_URL,
  },
  {
    name: 'Jordan',
    role: 'editor',
    imageUrl: '/jordan-avatar.jpg',
    profileUrl: JORDAN_PROFILE_URL,
  },
]
