export type GameStatus = 'planned' | 'playing' | 'completed'

export type Game = {
  id: string
  title: string
  description: string
  platform: 'PC' | 'PlayStation' | 'Xbox' | 'Switch'
  genre: string
  status: GameStatus
  rating: number
}