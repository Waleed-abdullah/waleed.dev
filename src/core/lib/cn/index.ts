import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges CSS class names efficiently using clsx and tailwind-merge.
 *
 * This utility function takes any number of class name arguments and:
 * 1. Uses clsx to combine them, handling various input types (strings, objects, arrays)
 * 2. Processes the combined classes through tailwind-merge to properly merge Tailwind CSS classes
 *
 * @param inputs - Any number of class name arguments (strings, objects, arrays)
 * @returns A merged string of CSS class names with Tailwind conflicts resolved
 *
 * @example
 * ```ts
 * cn('p-4', 'bg-red-500', 'bg-blue-500') // Returns 'p-4 bg-blue-500'
 * cn('p-2', { 'bg-red-500': true, 'bg-blue-500': false }) // Returns 'p-2 bg-red-500'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
