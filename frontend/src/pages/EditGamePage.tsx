import { Link, useNavigate, useParams } from 'react-router'
import { GameForm } from '../components/GameForm'
import type { Game, GameDraft } from '../types/game'

type EditGamePageProps = {
  games: Game[]
  onUpdate: (id: string, draft: GameDraft) => void
}

export function EditGamePage({ games, onUpdate }: EditGamePageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = games.find((item) => item.id === id)

  if (!game) {
    return (
      <section className="error-block">
        <h1>Игра не найдена</h1>
        <Link to="/games">К списку</Link>
      </section>
    )
  }

  const initialValues: GameDraft = {
    title: game.title,
    description: game.description,
    platform: game.platform,
    genre: game.genre,
    status: game.status,
    rating: game.rating,
  }

  return (
    <section>
      <h1>Редактирование игры</h1>
      <GameForm
        key={game.id}
        initialValues={initialValues}
        onSave={(draft) => {
          onUpdate(game.id, draft)
          navigate(`/games/${game.id}`)
        }}
        onCancel={() => navigate(`/games/${game.id}`)}
      />
    </section>
  )
}