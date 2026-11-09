import { useNavigate } from 'react-router'
import { GameForm } from '../components/GameForm'
import type { GameDraft } from '../types/game'

type NewGamePageProps = {
  onCreate: (draft: GameDraft) => string
}

const emptyGame: GameDraft = {
  title: '',
  description: '',
  platform: '',
  genre: '',
  status: 'planned',
  rating: 8,
}

export function NewGamePage({ onCreate }: NewGamePageProps) {
  const navigate = useNavigate()

  function handleSave(draft: GameDraft) {
    const id = onCreate(draft)
    navigate(`/games/${id}`)
  }

  return (
    <section>
      <h1>Добавление игры</h1>
      <GameForm
        initialValues={emptyGame}
        onSave={handleSave}
        onCancel={() => navigate('/games')}
      />
    </section>
  )
}