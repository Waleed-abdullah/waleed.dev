'use client';

import { motion, useDragControls, useMotionValue } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useIsClient } from '@/core/hooks/use-is-client';

import { FabButton } from './components/fab-button';
import { PrCard } from './components/pr-card';
import { useFabPosition } from './hooks/use-fab-position';

export const GymFab = () => {
  const isClient = useIsClient();
  const { initialPosition, savePosition } = useFabPosition();
  const [isOpen, setIsOpen] = useState(false);
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const dragControls = useDragControls();

  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);

  const handleDragEnd = useCallback(() => {
    savePosition({ x: x.get(), y: y.get() });
    requestAnimationFrame(() => {
      isDragging.current = false;
    });
  }, [savePosition, x, y]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isClient) return null;

  return (
    <div
      ref={constraintsRef}
      className="pointer-events-none fixed inset-0 z-[60]"
    >
      <motion.div
        ref={wrapperRef}
        className="pointer-events-auto absolute right-6 bottom-[calc(var(--footer-height)+1rem)] flex flex-col items-end"
        style={{ x, y }}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.1}
        dragConstraints={constraintsRef}
        onDragStart={() => {
          isDragging.current = true;
        }}
        onDragEnd={handleDragEnd}
      >
        <PrCard isOpen={isOpen} />
        <FabButton
          isOpen={isOpen}
          onToggle={() => {
            if (!isDragging.current) setIsOpen((prev) => !prev);
          }}
          onPointerDown={(e) => dragControls.start(e)}
        />
      </motion.div>
    </div>
  );
};
