import { Suspense } from 'react';
import PortfolioClient from '@/components/PortfolioClient';

export default function PortfolioPage() {
  return (
    <Suspense>
      <PortfolioClient />
    </Suspense>
  );
}

