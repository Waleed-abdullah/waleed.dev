'use client';

import { Dumbbell } from 'lucide-react';
import { motion } from 'motion/react';
import { type PointerEvent } from 'react';

const springTransition = { type: 'spring', bounce: 0.2, duration: 0.4 };

interface FabButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onPointerDown: (e: PointerEvent) => void;
}

export const FabButton = ({
  isOpen,
  onToggle,
  onPointerDown,
}: FabButtonProps) => {
  return (
    <motion.button
      className="bg-primary text-primary-foreground flex size-12 cursor-grab items-center justify-center rounded-full shadow-lg active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? 'Close gym PRs' : 'Show gym PRs'}
      aria-expanded={isOpen}
    >
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={springTransition}
        className="flex items-center justify-center"
      >
        <Dumbbell size={22} />
      </motion.span>
    </motion.button>
  );
};
