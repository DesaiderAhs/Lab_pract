import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <p className="app-title">Каталог игр</p>
        <nav aria-label="Основная навигация">
          <NavLink to="/games" end>Все игры</NavLink>
          <NavLink to="/games/new">Добавить игру</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}