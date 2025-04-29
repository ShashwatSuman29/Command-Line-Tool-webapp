import React, { ReactNode } from 'react';
import { motion, Variant, TargetAndTransition, VariantLabels } from 'framer-motion';

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  variant?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scale' | 'staggered';
  staggerIndex?: number;
  staggerDelay?: number;
  whileHover?: TargetAndTransition | VariantLabels;
  whileTap?: TargetAndTransition | VariantLabels;
}

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  staggered: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
};

const defaultHoverAnimation = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

const defaultTapAnimation = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  variant = 'fadeIn',
  staggerIndex = 0,
  staggerDelay = 0.1,
  whileHover,
  whileTap
}) => {
  const selectedVariant = variants[variant];
  const staggeredDelay = variant === 'staggered' ? delay + (staggerIndex * staggerDelay) : delay;
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={selectedVariant}
      transition={{ 
        duration, 
        delay: staggeredDelay,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
