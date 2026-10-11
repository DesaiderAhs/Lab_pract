import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="error-block">
      <h1>Страница не найдена</h1>
      <p>Такого адреса в приложении не существует (404).</p>
      <Link to="/games">Перейти в каталог игр</Link>
    </section>
  )
}