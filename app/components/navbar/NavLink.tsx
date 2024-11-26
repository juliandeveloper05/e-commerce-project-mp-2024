// components/navbar/NavLink.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  title: string;
  isActive: boolean;
}

const NavLink = ({ href, title, isActive }: NavLinkProps) => {
  return (
    <Link href={href}>
      <div
        className={`relative cursor-pointer text-sm font-medium transition-colors
          ${
            isActive ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
          }`}
      >
        {title}
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 w-full bg-purple-600"
            layoutId="navbar-underline"
          />
        )}
      </div>
    </Link>
  );
};

export default NavLink;
