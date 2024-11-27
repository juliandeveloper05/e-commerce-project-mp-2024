import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuthRequiredAction } from '@/app/hooks/useAuthRequiredAction';

interface FavoriteButtonProps {
  productId: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function FavoriteButton({
  productId,
  isFavorite,
  onToggleFavorite,
}: FavoriteButtonProps) {
  const { isAuthenticated, handleAuthRequired } = useAuthRequiredAction();

  const handleClick = () => {
    if (!isAuthenticated) {
      handleAuthRequired('guardar productos en favoritos');
      return;
    }
    onToggleFavorite();
  };

  return (
    <motion.button
      whileHover={{ scale: isAuthenticated ? 1.1 : 1 }}
      whileTap={{ scale: isAuthenticated ? 0.9 : 1 }}
      onClick={handleClick}
      className={`absolute right-2 top-2 z-20 rounded-full bg-white/90 p-2 shadow-lg transition-all
        ${
          !isAuthenticated ? 'cursor-not-allowed opacity-60' : 'hover:bg-white'
        }`}
    >
      <Heart
        className={`h-5 w-5 ${
          !isAuthenticated
            ? 'text-gray-400'
            : isFavorite
            ? 'fill-red-500 text-red-500'
            : 'text-gray-600'
        }`}
      />
    </motion.button>
  );
}
