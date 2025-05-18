'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/core/components/ui/button';
import { HOT_KEYS } from '@/core/constants/hot-keys';
import { cn } from '@/core/lib/cn';

const BASE_ANIMATION_CLASSES =
  'scale-100 rotate-0 dark:scale-0 dark:-rotate-90';
const BASE_ANIMATION_CLASSES_INVERTED =
  'scale-0 -rotate-90 dark:scale-100 dark:rotate-0';

export const ThemeSwitchButton = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  const isSystemTheme = theme === 'system';
  const isDarkMode = isSystemTheme ? systemTheme === 'dark' : theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  useHotkeys(HOT_KEYS.TOGGLE_THEME, toggleTheme);

  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme}>
      <Sun
        className={cn(
          'absolute size-4 transition-all duration-200',
          BASE_ANIMATION_CLASSES
        )}
      />
      <Moon
        className={cn(
          'absolute size-4 transition-all duration-200',
          BASE_ANIMATION_CLASSES_INVERTED
        )}
      />
    </Button>
  );
};
