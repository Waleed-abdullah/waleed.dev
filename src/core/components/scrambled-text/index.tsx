"use client";

import { useScramble, type UseScrambleProps } from "use-scramble";

import type { PropsWithClassName } from "@/core/types/common";

interface ScrambledTextProps extends PropsWithClassName<UseScrambleProps> {
  shouldReplay?: boolean;
}

export const ScrambledText = ({
  className,
  shouldReplay = true,
  ...scrambleOptions
}: ScrambledTextProps) => {
  const { ref, replay } = useScramble({
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    ...scrambleOptions,
  });

  return (
    <p
      ref={ref}
      onMouseOver={() => shouldReplay && replay()}
      onFocus={() => shouldReplay && replay()}
      className={className}
    />
  );
};
