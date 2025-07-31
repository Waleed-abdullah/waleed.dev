'use client';
import { useEffect, useState } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ClockProps {
  size: number;
}

export const Clock = ({ size }: ClockProps) => {
  const [time, setTime] = useState(() => new Date());

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
  const hourHandWidth = size * 0.04; // 2% of clock size
  const minuteHandWidth = size * 0.04; // 2% of clock size
  const secondHandWidth = size * 0.02; // 2% of clock size

  const hourAngle = hours * 30 + minutes * 0.5; // 30 degrees per hour + 0.5 degrees per minute, 360/12 = 30
  const minuteAngle = minutes * 6; // 6 degrees per minute, 360/60 = 6
  const secondAngle = seconds * 6; // 6 degrees per second, 360/60 = 6

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="relative" style={{ width: size, height: size }}>
          <div className="border-muted-foreground relative h-full w-full rounded-full border-1">
            {/* Hour hand */}
            <div
              className="bg-muted-foreground absolute top-1/2 left-1/2 origin-bottom rounded-full"
              style={{
                width: `${hourHandWidth}px`,
                height: `${hourHandLength}px`,
                transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
              }}
            />

            {/* Minute hand */}
            <div
              className="bg-muted-foreground absolute top-1/2 left-1/2 origin-bottom rounded-full"
              style={{
                width: `${minuteHandWidth}px`,
                height: `${minuteHandLength}px`,
                transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
              }}
            />

            {/* Second hand */}
            <div
              className="absolute top-1/2 left-1/2 origin-bottom rounded-full bg-red-500"
              style={{
                width: `${secondHandWidth}px`,
                height: `${secondHandLength}px`,
                transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
              }}
            />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="tabular-nums">
        {time.toLocaleTimeString()}
      </TooltipContent>
    </Tooltip>
  );
};
