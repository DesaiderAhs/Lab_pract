import { Link } from 'react-router'
import { GameCard } from '../components/GameCard'
import { games } from '../data/games'

export function GamesPage() {
  return (
    <section>
      <div className="page-header">
        <h1>Моя коллекция игр</h1>
        <Link to="/games/new" className="button-link">Добавить игру</Link>
      </div>

      {games.length === 0 ? (
        <p>Игр пока нет.</p>
      ) : (
        <div className="game-list">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  )
}