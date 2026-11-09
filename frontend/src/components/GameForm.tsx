import { useState } from 'react'
import type { FormEvent } from 'react'
import { usePlatforms } from '../hooks/usePlatforms'
import type { GameDraft, GameStatus } from '../types/game'

type GameFormProps = {
  initialValues: GameDraft
  onSave: (draft: GameDraft) => void
  onCancel: () => void
}

export function GameForm(props: GameFormProps) {
  const [draft, setDraft] = useState(() => ({ ...props.initialValues }))
  const [error, setError] = useState('')

  const { load, retry } = usePlatforms()
  const platforms = load.status === 'success' ? load.data : []
  const selectedPlatformExists = platforms.some((p) => p.id === draft.platform)
  const canSave = load.status === 'success' && selectedPlatformExists

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!canSave) {
      setError('Дождитесь загрузки справочника и выберите доступную платформу.')
      return
    }

    const title = draft.title.trim()
    if (title.length < 3 || title.length > 100) {
      setError('Название должно содержать от 3 до 100 символов.')
      return
    }

    const genre = draft.genre.trim()
    if (!genre) {
      setError('Укажите жанр игры.')
      return
    }

    const rating = Number(draft.rating)
    if (!Number.isFinite(rating) || rating < 1 || rating > 10) {
      setError('Оценка должна быть целым числом от 1 до 10.')
      return
    }

    setError('')
    props.onSave({
      ...draft,
      title,
      genre,
      rating,
    })
  }

  return (
    <form className="game-form" onSubmit={handleSubmit} noValidate>
      {error && <p className="form-error" role="alert">{error}</p>}

      <label htmlFor="game-title">Название игры *</label>
      <input
        id="game-title"
        type="text"
        value={draft.title}
        required
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />

      <label htmlFor="game-genre">Жанр *</label>
      <input
        id="game-genre"
        type="text"
        value={draft.genre}
        required
        onChange={(e) => setDraft({ ...draft, genre: e.target.value })}
      />

      <label htmlFor="game-platform">Платформа *</label>
      <select
        id="game-platform"
        value={draft.platform}
        required
        disabled={load.status !== 'success' || platforms.length === 0}
        onChange={(e) => setDraft({ ...draft, platform: e.target.value })}
      >
        <option value="">Выберите платформу</option>
        {draft.platform !== '' && !selectedPlatformExists && (
          <option value={draft.platform} disabled>
            Текущий код: {draft.platform} (выберите доступную)
          </option>
        )}
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>

      {load.status === 'loading' && (
        <p className="status-message" role="status">Загружаем платформы по сети...</p>
      )}

      {load.status === 'error' && (
        <div className="network-error-box">
          <p role="alert">{load.message}</p>
          <button type="button" className="button-retry" onClick={retry}>
            Повторить попытку
          </button>
        </div>
      )}

      {load.status === 'success' && platforms.length === 0 && (
        <div className="network-empty-box">
          <p role="status">Список платформ пуст. Сохранение недоступно.</p>
          <button type="button" className="button-retry" onClick={retry}>
            Повторить попытку
          </button>
        </div>
      )}

      <label htmlFor="game-status">Статус прохождения</label>
      <select
        id="game-status"
        value={draft.status}
        onChange={(e) => {
          const status = e.target.value as GameStatus
          if (status === 'planned' || status === 'playing' || status === 'completed') {
            setDraft({ ...draft, status })
          }
        }}
      >
        <option value="planned">В планах</option>
        <option value="playing">В процессе</option>
        <option value="completed">Пройдено</option>
      </select>

      <label htmlFor="game-rating">Оценка (от 1 до 10) *</label>
      <input
        id="game-rating"
        type="number"
        min="1"
        max="10"
        value={draft.rating}
        required
        onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
      />

      <label htmlFor="game-desc">Описание</label>
      <textarea
        id="game-desc"
        rows={4}
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
      />

      <div className="form-buttons">
        <button type="submit" className="button-link" disabled={!canSave}>
          Сохранить
        </button>
        <button type="button" className="button-cancel" onClick={props.onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}