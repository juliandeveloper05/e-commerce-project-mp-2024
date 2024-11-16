'use client';

import { useEffect, useState } from 'react';
import HeroSection from './components/hero-section/HeroSection';
import Loading from './components/Loading/Loading';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="mt-[140px] flex min-h-screen flex-col justify-between sm:mt-[96px] md:mt-[80px] lg:mt-[50px]">
      <HeroSection />
      <div className="h-20 sm:h-24 md:h-32 lg:h-0"></div>{' '}
      {/* Espaciador responsivo */}
    </main>
  );
}
