import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/core/lib/cn';

import { type ButtonProps } from './button.types';
import { buttonVariants } from './button.utils';

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

Button.displayName = 'Button';

export { Button, buttonVariants };
