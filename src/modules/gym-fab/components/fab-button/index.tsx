'use client';

import { Dumbbell } from 'lucide-react';
import { motion, type MotionValue } from 'motion/react';
import { type RefObject, useRef } from 'react';

const springTransition = { type: 'spring', bounce: 0.2, duration: 0.4 };

interface FabButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  x: MotionValue<number>;
  y: MotionValue<number>;
  dragConstraints: RefObject<HTMLDivElement | null>;
  onDragEnd: () => void;
}

export const FabButton = ({
  isOpen,
  onToggle,
  x,
  y,
  dragConstraints,
  onDragEnd,
}: FabButtonProps) => {
  const isDragging = useRef(false);

  return (
    <motion.button
      className="bg-primary text-primary-foreground flex size-12 cursor-grab items-center justify-center rounded-full shadow-lg active:cursor-grabbing"
      style={{ x, y }}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={dragConstraints}
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={() => {
        onDragEnd();
        requestAnimationFrame(() => {
          isDragging.current = false;
        });
      }}
      onClick={() => {
        if (!isDragging.current) onToggle();
      }}
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
