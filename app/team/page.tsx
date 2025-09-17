import { Suspense } from 'react';
import TeamClient from '@/components/TeamClient';

export default function TeamPage() {
  return (
    <Suspense>
      <TeamClient />
    </Suspense>
  );
}
