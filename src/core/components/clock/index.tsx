import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

import { useIsClient } from '@/core/hooks/use-is-client';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ClockProps {
  size: number;
  /** IANA time zone the clock shows, e.g. 'Asia/Karachi' */
  timeZone: string;
  /** Place named in the tooltip and label, e.g. 'Islamabad' */
  place: string;
}

export const Clock = ({ size, timeZone, place }: ClockProps) => {
  const [time, setTime] = useState(() => new Date());
  const isClient = useIsClient();
  // When the clock mounted, so the second hand angle can keep growing past
  // 360deg instead of jumping back (and spinning the long way) at :00
  const [mountedAt] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatters = useMemo(
    () => ({
      // 24-hour parts for the hands
      parts: new Intl.DateTimeFormat('en-US', {
        timeZone,
        hourCycle: 'h23',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }),
      // "12:24 PM" for the tooltip
      label: new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
      }),
    }),
    [timeZone]
  );

  // Hours, minutes and seconds of a moment in the clock's time zone
  const zoned = (date: Date) => {
    const parts = formatters.parts.formatToParts(date);
    const get = (type: Intl.DateTimeFormatPartTypes) =>
      Number(parts.find((part) => part.type === type)?.value ?? 0);
    return {
      hours: get('hour'),
      minutes: get('minute'),
      seconds: get('second'),
    };
  };

  const { hours: zonedHours, minutes } = zoned(time);
  const hours = zonedHours % 12;

  const hourHandLength = size * 0.25; // 25% of clock size
  const minuteHandLength = size * 0.35; // 35% of clock size
  const secondHandLength = size * 0.4; // 40% of clock size
  const hourHandWidth = size * 0.04; // 4% of clock size
  const minuteHandWidth = size * 0.04; // 4% of clock size
  const secondHandWidth = size * 0.02; // 2% of clock size

  const hourAngle = hours * 30 + minutes * 0.5; // 30 degrees per hour + 0.5 degrees per minute, 360/12 = 30
  const minuteAngle = minutes * 6; // 6 degrees per minute, 360/60 = 6
  // Whole seconds since mount, so a late timer tick never shifts the hand
  const elapsedSeconds =
    Math.floor(time.getTime() / 1000) - Math.floor(mountedAt.getTime() / 1000);
  // 6 degrees per second, 360/60 = 6
  const secondAngle = (zoned(mountedAt).seconds + elapsedSeconds) * 6;

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
              {/* Lifts and scales on hover like the footer icons, and goes
                  to full contrast. Not clickable, so no pointer cursor. */}
              <TooltipTrigger
                aria-label={`Time in ${place}`}
                className="group focus-visible:ring-ring -m-2 flex cursor-default rounded-full p-2 focus-visible:ring-2 focus-visible:outline-none"
              >
                <div
                  className="relative transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-0.5 group-hover:scale-115 group-focus-visible:-translate-y-0.5 group-focus-visible:scale-115 motion-reduce:transition-none"
                  style={{ width: size, height: size }}
                >
                  <div className="border-muted-foreground group-hover:border-foreground group-focus-visible:border-foreground relative h-full w-full rounded-full border-1 transition-colors duration-200">
                    {/* Hour hand */}
                    <motion.div
                      className="bg-muted-foreground group-hover:bg-foreground group-focus-visible:bg-foreground absolute top-1/2 left-1/2 origin-bottom rounded-full transition-colors duration-200"
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
                      className="bg-muted-foreground group-hover:bg-foreground group-focus-visible:bg-foreground absolute top-1/2 left-1/2 origin-bottom rounded-full transition-colors duration-200"
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
                      // Ticks with a small overshoot, like a quartz movement
                      className="absolute top-1/2 left-1/2 origin-bottom rounded-full bg-red-500 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none"
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
                {formatters.label.format(time)} in {place}
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
