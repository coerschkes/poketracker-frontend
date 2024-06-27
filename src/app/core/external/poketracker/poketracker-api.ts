export interface Pokemon {
  dex: number
  name: string
  types: string[]
  shiny: boolean
  normal: boolean
  universal: boolean
  regional: boolean
  editions: string[]
  normalSpriteUrl: string
  shinySpriteUrl: string
}

export interface User {
  userId: string
  avatarUrl: string
  bulkMode: boolean
}
