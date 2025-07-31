'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { useIsClient } from '@/core/hooks/use-is-client';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ClockProps {
  size: number;
}

export const Clock = ({ size }: ClockProps) => {
  const [time, setTime] = useState(() => new Date());
  const isClient = useIsClient();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourHandLength = size * 0.25; // 25% of clock size
  const minuteHandLength = size * 0.35; // 35% of clock size
  const secondHandLength = size * 0.4; // 40% of clock size
  const hourHandWidth = size * 0.04; // 4% of clock size
  const minuteHandWidth = size * 0.04; // 4% of clock size
  const secondHandWidth = size * 0.02; // 2% of clock size

  const hourAngle = hours * 30 + minutes * 0.5; // 30 degrees per hour + 0.5 degrees per minute, 360/12 = 30
  const minuteAngle = minutes * 6; // 6 degrees per minute, 360/60 = 6
  const secondAngle = seconds * 6; // 6 degrees per second, 360/60 = 6

  return (
    <div style={{ width: size, height: size }}>
      <AnimatePresence mode="wait">
        {!isClient ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ width: size, height: size }}
          >
            <div className="bg-muted h-full w-full animate-pulse rounded-full" />
          </motion.div>
        ) : (
          <motion.div
            key="clock"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Tooltip>
              <TooltipTrigger>
                <div className="relative" style={{ width: size, height: size }}>
                  <div className="border-muted-foreground relative h-full w-full rounded-full border-1">
                    {/* Hour hand */}
                    <motion.div
                      className="bg-muted-foreground absolute top-1/2 left-1/2 origin-bottom rounded-full"
                      style={{
                        width: `${hourHandWidth}px`,
                        height: `${hourHandLength}px`,
                        transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    />

                    {/* Minute hand */}
                    <motion.div
                      className="bg-muted-foreground absolute top-1/2 left-1/2 origin-bottom rounded-full"
                      style={{
                        width: `${minuteHandWidth}px`,
                        height: `${minuteHandLength}px`,
                        transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                    />

                    {/* Second hand */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 origin-bottom rounded-full bg-red-500"
                      style={{
                        width: `${secondHandWidth}px`,
                        height: `${secondHandLength}px`,
                        transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="tabular-nums">
                {time.toLocaleTimeString()}
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
