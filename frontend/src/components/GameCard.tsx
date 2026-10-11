import { Link } from 'react-router'
import type { Game } from '../types/game'

type GameCardProps = {
  game: Game
}

const statusLabels: Record<string, string> = {
  planned: 'В планах',
  playing: 'В процессе',
  completed: 'Пройдено',
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="game-card">
      <h2>
        <Link to={`/games/${game.id}`}>{game.title}</Link>
      </h2>
      <p>{game.description}</p>
      <div className="game-meta">
        <span>Платформа: {game.platform}</span>
        <span>Статус: {statusLabels[game.status]}</span>
      </div>
    </article>
  )
}