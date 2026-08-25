export type EditorialRole = 'writer' | 'reviewer' | 'editor'

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
    profileUrl: 'https://github.com/riderx',
  },
  {
    name: 'Valeria',
    role: 'reviewer',
    imageUrl: '/valeria-avatar.jpg',
  },
  {
    name: 'Jordan',
    role: 'editor',
    imageUrl: '/jordan-avatar.jpg',
  },
]
