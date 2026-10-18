import { useState } from 'react'
import { Link } from 'react-router'
import { GameCard } from '../components/GameCard'
import type { Game, GameStatus } from '../types/game'

type GamesPageProps = {
  games: Game[]
}

export function GamesPage({ games }: GamesPageProps) {
  const [status, setStatus] = useState<GameStatus | 'all'>('all')

  const visibleGames = games.filter(
    (game) => status === 'all' || game.status === status
  )

  return (
    <section>
      <div className="page-header">
        <h1>Моя коллекция игр</h1>
        <Link to="/games/new" className="button-link">Добавить игру</Link>
      </div>

      <div className="filter-bar">
        <label htmlFor="status-filter">Фильтр по статусу: </label>
        <select
          id="status-filter"
          value={status}
          onChange={(e) => {
            const val = e.target.value
            if (val === 'all' || val === 'planned' || val === 'playing' || val === 'completed') {
              setStatus(val)
            }
          }}
        >
          <option value="all">Все</option>
          <option value="planned">В планах</option>
          <option value="playing">В процессе</option>
          <option value="completed">Пройдено</option>
        </select>
        {status !== 'all' && (
          <button type="button" className="button-reset" onClick={() => setStatus('all')}>
            Сбросить фильтр
          </button>
        )}
      </div>

      {games.length === 0 ? (
        <p>Игр пока нет. Добавьте первую игру!</p>
      ) : visibleGames.length === 0 ? (
        <p>Нет игр с выбранным статусом.</p>
      ) : (
        <div className="game-list">
          {visibleGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  )
}