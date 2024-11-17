import { motion } from 'framer-motion';

interface ProductInfoProps {
  name: string;
  price: number;
  description?: string;
}

export const ProductInfo = ({ name, price, description }: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold tracking-tight text-gray-900"
      >
        {name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-medium text-purple-600"
      >
        ${price?.toLocaleString()}
      </motion.p>

      {description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base text-gray-700"
        >
          <p>{description}</p>
        </motion.div>
      )}
    </div>
  );
};
