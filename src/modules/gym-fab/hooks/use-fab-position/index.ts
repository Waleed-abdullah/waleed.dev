import { useCallback, useState } from 'react';

import { FAB_DEFAULT_POSITION, FAB_STORAGE_KEY } from '../../constants';

interface Position {
  x: number;
  y: number;
}

export function useFabPosition() {
  const [position, setPosition] = useState<Position>(() => {
    if (typeof window === 'undefined') return FAB_DEFAULT_POSITION;
    try {
      const stored = localStorage.getItem(FAB_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Position) : FAB_DEFAULT_POSITION;
    } catch {
      return FAB_DEFAULT_POSITION;
    }
  });

  const savePosition = useCallback((pos: Position) => {
    setPosition(pos);
    try {
      localStorage.setItem(FAB_STORAGE_KEY, JSON.stringify(pos));
    } catch {
      // localStorage unavailable
    }
  }, []);

  return { position, savePosition };
}
