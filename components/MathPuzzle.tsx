'use client';

import { useState } from 'react';

type Puzzle = {
  question: string;
  correctAnswer: number;
};

const samplePuzzle: Puzzle = {
  question: '7 × ? = 35',
  correctAnswer: 5,
};

export default function MathPuzzle() {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const checkAnswer = () => {
    const isCorrect = parseInt(answer) === samplePuzzle.correctAnswer;
    setFeedback(isCorrect ? '✅ Correct!' : '❌ Try Again');
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl text-white text-center">
      <h2 className="text-2xl font-bold mb-4">🧠 Solve the Puzzle</h2>
      <p className="text-xl mb-4">{samplePuzzle.question}</p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="px-4 py-2 rounded text-white"
        placeholder="Your answer"
      />
      <button
        onClick={checkAnswer}
        className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
      >
        Check
      </button>
      {feedback && <p className="mt-4 text-lg">{feedback}</p>}
    </div>
  );
}
