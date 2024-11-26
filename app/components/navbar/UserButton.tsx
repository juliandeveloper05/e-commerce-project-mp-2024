'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const UserButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      router.push('/account');
    } else {
      router.push('/login');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-3 text-purple-600 shadow-sm transition-all hover:bg-purple-50"
    >
      {session ? (
        <Image
          src={session.user?.image || '/default-avatar.png'}
          alt="Profile"
          width={20}
          height={20}
          className="rounded-full"
        />
      ) : (
        <User className="h-5 w-5" />
      )}
    </motion.button>
  );
};

export default UserButton;
