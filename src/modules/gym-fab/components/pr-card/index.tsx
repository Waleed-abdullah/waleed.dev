'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/core/components/ui/toggle-group';

import { GYM_PRS, LBS_TO_KG } from '../../constants';

const springTransition = { type: 'spring', bounce: 0.2, duration: 0.4 };

type Unit = 'lbs' | 'kg';

interface PrCardProps {
  isOpen: boolean;
}

function formatWeight(lbs: number, unit: Unit) {
  if (unit === 'lbs') return `${lbs} lbs`;
  return `${Math.round(lbs * LBS_TO_KG)} kg`;
}

export const PrCard = ({ isOpen }: PrCardProps) => {
  const [unit, setUnit] = useState<Unit>('lbs');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={springTransition}
          className="bg-card text-card-foreground border-border mb-3 w-48 rounded-xl border p-4 shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold">Gym PRs</p>
            <ToggleGroup
              type="single"
              value={unit}
              onValueChange={(v) => {
                if (v) setUnit(v as Unit);
              }}
              size="sm"
              variant="outline"
              className="h-5 gap-0"
            >
              <ToggleGroupItem value="lbs" className="h-5 px-1.5 text-[10px]">
                lbs
              </ToggleGroupItem>
              <ToggleGroupItem value="kg" className="h-5 px-1.5 text-[10px]">
                kg
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <ul className="space-y-1">
            {GYM_PRS.map((pr) => (
              <li key={pr.name} className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">{pr.name}</span>
                <span className="text-xs font-medium tabular-nums">
                  {formatWeight(pr.lbs, unit)}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
