import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout'
import { GamesPage } from './pages/GamesPage'
import { GameDetailsPage } from './pages/GameDetailsPage'
import { NewGamePage } from './pages/NewGamePage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/games" replace />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="games/new" element={<NewGamePage />} />
        <Route path="games/:id" element={<GameDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}