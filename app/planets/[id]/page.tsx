'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const puzzles: Record<string, { question: string; answer: number }[]> = {
  '1': [
    { question: '5 x 4', answer: 20 },
    { question: '9 + 6', answer: 15 },
    { question: '12 ÷ 4', answer: 3 },
    { question: '8 - 3', answer: 5 },
    { question: '3 x 7', answer: 21 },
  ],
  '2': [
    { question: '10 + 15', answer: 25 },
    { question: '6 x 6', answer: 36 },
    { question: '18 ÷ 3', answer: 6 },
    { question: '7 x 2', answer: 14 },
    { question: '9 - 4', answer: 5 },
  ],
  '3': [
    { question: '11 + 8', answer: 19 },
    { question: '5 x 9', answer: 45 },
    { question: '36 ÷ 6', answer: 6 },
    { question: '14 - 7', answer: 7 },
    { question: '4 x 3', answer: 12 },
  ],
  '4': [
    { question: '13 + 6', answer: 19 },
    { question: '7 x 3', answer: 21 },
    { question: '20 ÷ 5', answer: 4 },
    { question: '9 + 8', answer: 17 },
    { question: '15 - 5', answer: 10 },
  ],
  '5': [
    { question: '10 x 3', answer: 30 },
    { question: '27 ÷ 9', answer: 3 },
    { question: '6 x 5', answer: 30 },
    { question: '24 ÷ 6', answer: 4 },
    { question: '18 - 9', answer: 9 },
  ],
};

export default function PlanetPuzzle() {
  const { id } = useParams();
  const router = useRouter();

  const planetId = id as string;
  const puzzleSet = puzzles[planetId];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Track window size for Confetti component
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (gameOver || isCorrect) return;

    if (timeLeft === 0) {
      setMessage('⏰ Time is up!');
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isCorrect, gameOver]);

  if (!puzzleSet) {
    return (
      <main className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <h2 className="text-2xl text-center">Planet {id} is not available.</h2>
      </main>
    );
  }

  const currentPuzzle = puzzleSet[currentIndex];

  const handleSubmit = () => {
    if (parseInt(answer) === currentPuzzle.answer) {
      setIsCorrect(true);
      setScore((prev) => prev + 10);
      setMessage('✅ Correct!');
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 2000);

      if (currentIndex + 1 < puzzleSet.length) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setAnswer('');
          setIsCorrect(false);
          setMessage('');
          setTimeLeft(30);
        }, 1000);
      } else {
        setTimeout(() => {
          setMessage('🎉 You conquered the planet!');
        }, 1000);
      }
    } else {
      setMessage('❌ Incorrect. Try again!');
    }
  };

  const handleNext = () => {
    const nextId = String(Number(planetId) + 1);
    if (puzzles[nextId]) {
      router.push(`/planets/${nextId}?score=${score}`);
    } else {
      router.push(`/leaderboard?score=${score}`);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6 relative overflow-hidden flex flex-col max-w-xl mx-auto">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold flex-grow">
          🪐 Planet {id}
        </h2>
        <button
          onClick={() => setShowHowToPlay(true)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm sm:text-base min-w-[130px]"
          aria-label="How to play instructions"
        >
          How to Play
        </button>
      </header>

      <section className="flex flex-wrap justify-between gap-4 mb-4 text-lg">
        <p>🎯 Score: {score}</p>
        <p>⏳ Time Left: {timeLeft}s</p>
      </section>

      <p className="text-xl mb-4">
        Puzzle {currentIndex + 1} of {puzzleSet.length}
      </p>
      <p className="text-2xl mb-6 break-words">What is {currentPuzzle.question}?</p>

      <input
        type="number"
        className="text-black p-3 rounded border border-gray-300 bg-white mb-4 w-full max-w-xs"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={gameOver || isCorrect}
        aria-label="Your answer"
        inputMode="numeric"
        pattern="[0-9]*"
      />

      <div className="flex flex-wrap gap-4 items-center">
        <button
          onClick={handleSubmit}
          className="bg-green-600 px-5 py-3 rounded-xl text-white hover:bg-green-500 disabled:opacity-50 min-w-[120px] text-center"
          disabled={gameOver || isCorrect}
        >
          Submit
        </button>

        {currentIndex === puzzleSet.length - 1 && isCorrect && (
          <button
            onClick={handleNext}
            className="bg-blue-600 px-5 py-3 rounded-xl text-white hover:bg-blue-500 min-w-[140px]"
          >
            🚀 Next Planet
          </button>
        )}
      </div>

      {message && <p className="mt-5 text-lg">{message}</p>}

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="howToPlayTitle"
        >
          <div
            className="
              bg-white text-black rounded-lg max-w-md w-full p-6
              relative shadow-lg overflow-y-auto max-h-[80vh]
            "
          >
            <h3
              id="howToPlayTitle"
              className="text-2xl font-bold mb-4 text-center"
            >
              How to Play
            </h3>
            <ul className="list-disc list-inside space-y-3 text-base leading-relaxed">
              <li>Read the math puzzle question displayed.</li>
              <li>Enter the correct numerical answer in the input box.</li>
              <li>You have 30 seconds to answer each puzzle.</li>
              <li>Submit your answer by clicking the "Submit" button.</li>
              <li>If correct, you earn 10 points and move to the next puzzle.</li>
              <li>If incorrect, try again before time runs out.</li>
              <li>Complete all puzzles to conquer the planet!</li>
            </ul>

            <button
              onClick={() => setShowHowToPlay(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold p-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Close How to Play"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
