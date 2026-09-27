import './App.css'

const appTitle: string = 'Каталог игр'

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>{appTitle}</h1>
        <p>Учёт личной коллекции игр, платформ и статусов прохождения.</p>
      </header>

      <section aria-labelledby="games-title">
        <h2 id="games-title">Мои игры</h2>
        <p>Здесь появится список добавленных игр.</p>
      </section>
    </main>
  )
}