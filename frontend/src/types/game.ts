export type GameStatus = 'planned' | 'playing' | 'completed'

export type Game = {
  id: string
  title: string
  description: string
  platform: string
  genre: string
  status: GameStatus
  rating: number
}

export type GameDraft = Omit<Game, 'id'>