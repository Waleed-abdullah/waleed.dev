'use client';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'motion/react';
import { useState } from 'react';

import { Tabs, TabsList } from '@/core/components/ui/tabs';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/core/components/ui/toggle-group';
import { cn } from '@/core/lib/cn';

import { ComponentShowcase } from '../common/component-showcase';
import { DEFAULT_TAB, TABS } from './constants';

interface AnimatedTabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  isActive?: boolean;
  activeProps?: React.ComponentProps<typeof motion.span>;
  layoutId: string;
  durationMultiplier?: number;
}

const AnimatedTabsTrigger = ({
  className,
  children,
  isActive,
  activeProps,
  layoutId,
  durationMultiplier = 1,
  ...props
}: AnimatedTabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      'group ring-offset-background text-primary focus-visible:ring-ring relative inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    {isActive && (
      <motion.span
        layoutId={layoutId}
        className={cn(
          'bg-secondary dark:bg-secondary-foreground absolute inset-0 bottom-0 z-10 mix-blend-difference',
          activeProps?.className
        )}
        style={{ borderRadius: 9999 }}
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.8 / durationMultiplier,
        }}
        {...activeProps}
      />
    )}
  </TabsPrimitive.Trigger>
);

const SPEEDS = {
  SLOW: 0.1,
  MEDIUM: 0.5,
  FAST: 1,
} as const;

export const AnimatedTabsShowcase = () => {
  const [currentTab, setCurrent] =
    useState<(typeof TABS)[keyof typeof TABS]>(DEFAULT_TAB);
  const [currentSpeed, setCurrentSpeed] = useState('1');
  return (
    <ComponentShowcase className="min-h-[300px]">
      <div className="absolute top-2 right-2 flex gap-0.5">
        <ToggleGroup
          type="single"
          value={currentSpeed}
          onValueChange={setCurrentSpeed}
        >
          {Object.entries(SPEEDS).map(([key, value]) => (
            <ToggleGroupItem key={key} value={value.toString()}>
              {value}x
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Tabs
        value={currentTab}
        onValueChange={(value) =>
          setCurrent(value as (typeof TABS)[keyof typeof TABS])
        }
      >
        <TabsList>
          {Object.values(TABS).map((tab) => (
            <AnimatedTabsTrigger
              key={tab}
              layoutId="animated-tabs-showcase"
              isActive={currentTab === tab}
              value={tab}
              durationMultiplier={parseFloat(currentSpeed)}
            >
              {tab}
            </AnimatedTabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </ComponentShowcase>
  );
};
