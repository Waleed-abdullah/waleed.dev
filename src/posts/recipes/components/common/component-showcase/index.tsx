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
        'bg-background border-border relative mx-auto my-4 flex size-full h-full max-h-[300px] items-center justify-center rounded-lg border p-6 shadow-lg dark:shadow-white/5',
        className
      )}
    >
      {children}
    </div>
  );
};
