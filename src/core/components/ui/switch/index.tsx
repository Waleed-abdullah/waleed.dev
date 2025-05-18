'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';
import { useState } from 'react';

import { cn } from '@/core/lib/cn';

const SWITCH_PRESS_ANIMATE_TIMEOUT_DURATION = 150;

const Switch = ({
  className,
  onPointerDown,
  onPointerUp,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isReleased, setIsReleased] = useState(false);

  const handlePress = () => {
    setIsReleased(false);
    setIsPressed(true);
  };

  const handleRelease = () => {
    setIsReleased(true);
  };

  React.useEffect(() => {
    if (!isReleased) return;

    const timeout = setTimeout(() => {
      setIsPressed(false);
    }, SWITCH_PRESS_ANIMATE_TIMEOUT_DURATION);

    return () => clearTimeout(timeout);
  }, [isReleased]);

  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
      onPointerDown={(e) => {
        onPointerDown?.(e);
        handlePress();
      }}
      onPointerUp={(e) => {
        onPointerUp?.(e);
        handleRelease();
      }}
    >
      <SwitchPrimitives.Thumb
        data-pressed={isPressed}
        className={cn(
          'bg-background pointer-events-none block size-5 rounded-full shadow-lg ring-0 transition-[translate,width] duration-300 data-[pressed=true]:w-7.5 data-[state=checked]:translate-x-5 data-[state=checked]:data-[pressed=true]:translate-x-2.5 data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
};
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
