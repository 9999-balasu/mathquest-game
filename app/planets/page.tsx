'use client';

import Link from 'next/link';

export default function Planets() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h2 className="text-4xl font-bold mb-6">🪐 Choose a Planet</h2>
      <div className="space-y-4">
        <Link href="/planets/1">
          <div className="block bg-purple-700 p-4 rounded-xl hover:bg-purple-600 cursor-pointer">
            🌍 Planet 1 - Multiplication Puzzle
          </div>
        </Link>
        <Link href="/planets/2">
          <div className="block bg-blue-700 p-4 rounded-xl hover:bg-blue-600 cursor-pointer">
            🪐 Planet 2 - Addition Puzzle
          </div>
        </Link>
        <Link href="/planets/3">
          <div className="block bg-green-700 p-4 rounded-xl hover:bg-green-600 cursor-pointer">
            🌌 Planet 3 - Division Puzzle
          </div>
        </Link>
        <Link href="/planets/4">
          <div className="block bg-pink-700 p-4 rounded-xl hover:bg-pink-600 cursor-pointer">
            🌙 Planet 4 - Subtraction Puzzle
          </div>
        </Link>
        <Link href="/planets/5">
          <div className="block bg-red-700 p-4 rounded-xl hover:bg-red-600 cursor-pointer">
            ☄️ Planet 5 - Multiplication Puzzle
          </div>
        </Link>
        <Link href="/leaderboard">
          <div className="block bg-yellow-600 p-4 rounded-xl hover:bg-yellow-500 cursor-pointer">
            🏆 Leaderboard
          </div>
        </Link>
      </div>
    </main>
  );
}
