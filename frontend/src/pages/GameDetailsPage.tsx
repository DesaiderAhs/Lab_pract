import { Link, useNavigate, useParams } from 'react-router'
import type { Game } from '../types/game'

type GameDetailsPageProps = {
  games: Game[]
  onDelete: (id: string) => void
}

const statusLabels: Record<string, string> = {
  planned: 'В планах',
  playing: 'В процессе',
  completed: 'Пройдено',
}

export function GameDetailsPage({ games, onDelete }: GameDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = games.find((item) => item.id === id)

  if (!game) {
    return (
      <section className="error-block">
        <h1>Игра не найдена</h1>
        <p>Запись с идентификатором «{id}» отсутствует в каталоге.</p>
        <Link to="/games">Вернуться к списку игр</Link>
      </section>
    )
  }

  return (
    <section className="details-block">
      <h1>{game.title}</h1>
      <p className="details-desc">{game.description}</p>

      <div className="details-info">
        <p><strong>Жанр:</strong> {game.genre}</p>
        <p><strong>Платформа:</strong> {game.platform}</p>
        <p><strong>Статус:</strong> {statusLabels[game.status]}</p>
        <p><strong>Личная оценка:</strong> {game.rating} / 10</p>
      </div>

      <div className="details-actions">
        <Link to={`/games/${game.id}/edit`} className="button-link">
          Редактировать
        </Link>
        <button
          type="button"
          className="button-danger"
          onClick={() => {
            if (window.confirm(`Удалить игру «${game.title}»?`)) {
              onDelete(game.id)
              navigate('/games', { replace: true })
            }
          }}
        >
          Удалить
        </button>
        <Link to="/games" className="back-link">← Назад к списку</Link>
      </div>
    </section>
  )
}