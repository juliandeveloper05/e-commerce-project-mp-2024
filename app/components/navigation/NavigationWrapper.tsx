'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from '../../components/Loading/Loading';

interface NavigationWrapperProps {
  href: string;
  children: React.ReactNode;
}

const NavigationWrapper = ({ href, children }: NavigationWrapperProps) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = () => {
    setIsNavigating(true);
    router.push(href);
  };

  if (isNavigating) {
    return <Loading />;
  }

  return (
    <div onClick={handleNavigation} className="cursor-pointer">
      {children}
    </div>
  );
};

export default NavigationWrapper;
