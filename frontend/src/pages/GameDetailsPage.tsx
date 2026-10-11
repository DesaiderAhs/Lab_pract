import { Link, useParams } from 'react-router'
import { games } from '../data/games'

const statusLabels: Record<string, string> = {
  planned: 'В планах',
  playing: 'В процессе',
  completed: 'Пройдено',
}

export function GameDetailsPage() {
  const { id } = useParams()
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
        <Link to="/games">← Назад к списку</Link>
      </div>
    </section>
  )
}