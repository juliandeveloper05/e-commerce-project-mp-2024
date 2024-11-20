'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HamburgerIconProps {
  isOpen: boolean;
  className?: string;
}

const HamburgerIconAnotherVersion: React.FC<HamburgerIconProps> = ({
  isOpen,
  className = '',
}) => {
  const width = 32;
  const height = 32;
  const lineHeight = 3;
  const lineSpacing = 6;

  const topLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      width: '100%',
      translateX: 0,
    },
    open: {
      rotate: 45,
      y: lineSpacing + lineHeight,
      width: '140%',
      translateX: '-20%',
    },
  };

  const middleLineVariants = {
    closed: {
      opacity: 1,
      width: '100%',
      translateX: 0,
    },
    open: {
      opacity: 0,
      width: 0,
      translateX: '50%',
    },
  };

  const bottomLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      width: '100%',
      translateX: 0,
    },
    open: {
      rotate: -45,
      y: -(lineSpacing + lineHeight),
      width: '140%',
      translateX: '-20%',
    },
  };

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="overflow-visible"
      >
        <motion.line
          x1="4"
          x2={width - 4}
          y1={height / 2 - lineSpacing}
          y2={height / 2 - lineSpacing}
          stroke="currentColor"
          strokeWidth={lineHeight}
          strokeLinecap="round"
          variants={topLineVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{
            duration: 0.4,
            ease: [0.6, 0.05, -0.01, 0.9],
          }}
        />
        <motion.line
          x1="4"
          x2={width - 4}
          y1={height / 2}
          y2={height / 2}
          stroke="currentColor"
          strokeWidth={lineHeight}
          strokeLinecap="round"
          variants={middleLineVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{
            duration: 0.4,
            ease: [0.6, 0.05, -0.01, 0.9],
          }}
        />
        <motion.line
          x1="4"
          x2={width - 4}
          y1={height / 2 + lineSpacing}
          y2={height / 2 + lineSpacing}
          stroke="currentColor"
          strokeWidth={lineHeight}
          strokeLinecap="round"
          variants={bottomLineVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{
            duration: 0.4,
            ease: [0.6, 0.05, -0.01, 0.9],
          }}
        />
      </svg>
    </div>
  );
};

export default HamburgerIconAnotherVersion;
