import { cn } from '@/core/lib/cn';
import {
  type PropsWithChildren,
  type PropsWithClassName,
} from '@/core/types/common';

export const ComponentShowcase = ({
  className,
  children,
}: PropsWithChildren<PropsWithClassName>) => {
  return (
    <div
      className={cn(
        'bg-background border-border relative mx-auto my-6 flex w-full items-center justify-center rounded-lg border p-4 shadow-lg sm:p-6 dark:shadow-white/5',
        className
      )}
    >
      {children}
    </div>
  );
};
