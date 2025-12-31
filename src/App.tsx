import Game from '@/components/game'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <Game />
      </main>
    </div>
  )
}
