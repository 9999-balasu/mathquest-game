'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Howl } from 'howler';

type Player = {
  name: string;
  score: number;
};

export default function Leaderboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const finalScore = parseInt(searchParams.get('score') || '0');

  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [playConfetti, setPlayConfetti] = useState(false);

  const sound = new Howl({
    src: ['/success.mp3'],
    volume: 0.5,
  });

  useEffect(() => {
    const stored = localStorage.getItem('leaderboard');
    if (stored) {
      const parsed = JSON.parse(stored);
      setLeaderboard(parsed);
    }
  }, []);

  const handleSubmit = () => {
    const newEntry = { name, score: finalScore };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem('leaderboard', JSON.stringify(updated));
    setSubmitted(true);

    if (updated[0].name === name && updated[0].score === finalScore) {
      setPlayConfetti(true);
    }

    sound.play();
  };

  const handlePlayAgain = () => {
    router.push('/planets/1');
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6 flex justify-center items-start">
      {playConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">🏆 Leaderboard</h1>

        {!submitted && (
          <div className="mb-6">
            <p className="mb-2 text-lg text-center">
              Your Score: <strong>{finalScore}</strong>
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <input
                type="text"
                className="text-black p-2 rounded mb-3 sm:mb-0 flex-1"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="bg-green-600 px-4 py-2 rounded-xl text-white hover:bg-green-500"
                disabled={!name.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <ul className="space-y-3 mb-6">
          {leaderboard.map((user, i) => (
            <motion.li
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{
                delay: i * 0.2,
                type: 'spring',
                stiffness: 300,
                damping: 15,
              }}
              className={`p-4 rounded-xl text-center ${
                i === 0 ? 'bg-yellow-500 text-black font-bold' : 'bg-gray-800'
              }`}
            >
              {i + 1}. <strong>{user.name}</strong> - {user.score} pts
            </motion.li>
          ))}
        </ul>

        <div className="flex justify-center">
          <button
            onClick={handlePlayAgain}
            className="bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-500"
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    </main>
  );
}
