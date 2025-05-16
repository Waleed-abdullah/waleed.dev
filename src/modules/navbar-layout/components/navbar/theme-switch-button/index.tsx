"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/lib/cn";

const BASE_ANIMATION_CLASSES =
  "scale-100 rotate-0 dark:scale-0 dark:-rotate-90";
const BASE_ANIMATION_CLASSES_INVERTED =
  "scale-0 -rotate-90 dark:scale-100 dark:rotate-0";

export const ThemeSwitchButton = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  const isSystemTheme = theme === "system";
  const isDarkMode = isSystemTheme ? systemTheme === "dark" : theme === "dark";

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        setTheme(isDarkMode ? "light" : "dark");
      }}
    >
      <Sun
        className={cn(
          "size-4 transition-all absolute duration-200",
          BASE_ANIMATION_CLASSES
        )}
      />
      <Moon
        className={cn(
          "size-4 transition-all absolute duration-200",
          BASE_ANIMATION_CLASSES_INVERTED
        )}
      />
    </Button>
  );
};
