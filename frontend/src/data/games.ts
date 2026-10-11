import type { Game } from '../types/game'

export const games: Game[] = [
  {
    id: 'g1',
    title: 'Ведьмак 3: Дикая Охота',
    description: 'Ролевая игра с открытым миром про ведьмака Геральта из Ривии.',
    platform: 'PC',
    genre: 'RPG',
    status: 'completed',
    rating: 10,
  },
  {
    id: 'g2',
    title: 'Cyberpunk 2077',
    description: 'Приключенческий экшен в городе будущего Найт-Сити.',
    platform: 'PC',
    genre: 'Action RPG',
    status: 'completed',
    rating: 9,
  },
  {
    id: 'g3',
    title: 'Red Dead Redemption 2',
    description: 'История Артура Моргана и банды Ван дер Линде на Диком Западе.',
    platform: 'PlayStation',
    genre: 'Action-adventure',
    status: 'playing',
    rating: 10,
  },
  {
    id: 'g4',
    title: 'Elden Ring',
    description: 'Мрачная ролевая игра в Междуземье с упором на исследование и боссов.',
    platform: 'PC',
    genre: 'Souls-like',
    status: 'planned',
    rating: 9,
  },
  {
    id: 'g5',
    title: 'Hollow Knight',
    description: 'Атмосферная метроидвания про исследователя подземного королевства жуков.',
    platform: 'Switch',
    genre: 'Metroidvania',
    status: 'completed',
    rating: 9,
  },
]