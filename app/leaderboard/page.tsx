// app/leaderboard/page.tsx
import { Suspense } from 'react';
import Leaderboard from './Leaderboard';

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Leaderboard />
    </Suspense>
  );
}
