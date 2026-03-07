'use client';

import { useMotionValue } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useIsClient } from '@/core/hooks/use-is-client';

import { FabButton } from './components/fab-button';
import { PrCard } from './components/pr-card';
import { useFabPosition } from './hooks/use-fab-position';

export const GymFab = () => {
  const isClient = useIsClient();
  const { position, savePosition } = useFabPosition();
  const [isOpen, setIsOpen] = useState(false);
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);

  const handleDragEnd = useCallback(() => {
    savePosition({ x: x.get(), y: y.get() });
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
      <div
        ref={wrapperRef}
        className="pointer-events-auto absolute right-6 bottom-[calc(var(--footer-height)+1rem)] flex flex-col items-end"
      >
        <PrCard isOpen={isOpen} />
        <FabButton
          isOpen={isOpen}
          onToggle={() => setIsOpen((prev) => !prev)}
          x={x}
          y={y}
          dragConstraints={constraintsRef}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
};
