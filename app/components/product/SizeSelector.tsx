import { motion } from 'framer-motion';
import type { Size } from '../../types/ProductTypes';

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

export const SizeSelector = ({
  sizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Talla</h3>
        <span className="text-sm text-gray-500">Selecciona tu talla</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {sizes.map((size) => (
          <motion.button
            key={size.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSizeSelect(size.id)}
            className={`flex h-14 items-center justify-center rounded-full border-2 text-sm font-medium transition-all
              ${
                selectedSize === size.id
                  ? 'border-purple-500 bg-purple-50 text-purple-600'
                  : 'border-gray-200 text-gray-900 hover:border-purple-500'
              }`}
          >
            {size.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
