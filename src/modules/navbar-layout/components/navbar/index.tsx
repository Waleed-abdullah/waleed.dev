"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/lib/cn";

const BASE_ANIMATION_CLASSES =
  "scale-100 rotate-0 dark:scale-0 dark:-rotate-90";
const BASE_ANIMATION_CLASSES_INVERTED =
  "scale-0 -rotate-90 dark:scale-100 dark:rotate-0";

export const Navbar = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  const isSystemTheme = theme === "system";
  const isLightMode = isSystemTheme
    ? systemTheme === "light"
    : theme === "light";
  const isDarkMode = isSystemTheme ? systemTheme === "dark" : theme === "dark";

  console.log({ isSystemTheme, isLightMode, isDarkMode });

  return (
    <nav className="sticky bg-transparent top-0 backdrop-blur z-50 flex h-[var(--navbar-height)] py-2 px-2">
      <Button
        size="icon"
        variant="ghost"
        className="ml-auto"
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
    </nav>
  );
};
