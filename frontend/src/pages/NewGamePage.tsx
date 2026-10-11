import { Link } from 'react-router'

export function NewGamePage() {
  return (
    <section>
      <h1>Добавление новой игры</h1>
      <p>Форма добавления и сохранение появятся в будущем.</p>
      <Link to="/games">Вернуться к списку</Link>
    </section>
  )
}