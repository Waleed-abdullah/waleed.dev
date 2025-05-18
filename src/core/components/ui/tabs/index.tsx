'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'motion/react';
import * as React from 'react';

import { cn } from '@/core/lib/cn';

const Tabs = TabsPrimitive.Root;

const TabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      'text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1',
      className
    )}
    {...props}
  />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      'ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn(
      'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      className
    )}
    {...props}
  />
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

interface AnimatedTabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  isActive?: boolean;
  activeProps?: React.ComponentProps<typeof motion.span>;
  layoutId: string;
}

const AnimatedTabsTrigger = ({
  className,
  children,
  isActive,
  activeProps,
  layoutId,
  ...props
}: AnimatedTabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      'group ring-offset-background focus-visible:ring-ring data-[state=active]:text-foreground relative inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    {isActive && (
      <motion.span
        layoutId={layoutId}
        className="bg-primary absolute inset-x-0 bottom-0 z-10 h-0.5 mix-blend-difference"
        style={{ borderRadius: 9999 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        {...activeProps}
      />
    )}
  </TabsPrimitive.Trigger>
);

export { AnimatedTabsTrigger, Tabs, TabsContent, TabsList, TabsTrigger };
