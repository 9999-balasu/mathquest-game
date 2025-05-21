export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-700 to-black text-white p-8">
      <h1 className="text-5xl font-bold mb-4">🚀 MathQuest: Galaxy Puzzle Game</h1>
      <p className="text-xl mb-8 text-center max-w-lg">
        Answer math puzzles, unlock planets, and become the smartest hero in the universe!
      </p>
      <a
        href="/planets"
        className="bg-green-500 px-6 py-3 rounded-xl text-black font-semibold hover:bg-green-400"
      >
        Start the Quest
      </a>
    </main>
  );
}

