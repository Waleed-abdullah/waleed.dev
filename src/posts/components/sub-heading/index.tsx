import { cn } from '@/core/lib/cn';
import { type PropsWithClassName } from '@/core/types/common';

interface SubheadingProps extends PropsWithClassName {
  text?: string;
}

export const Subheading = ({ text, className }: SubheadingProps) => {
  return (
    <p className={cn('text-muted-foreground text-xs', className)}>{text}</p>
  );
};
