"use client";

import { useScramble, type UseScrambleProps } from "use-scramble";

import type { PropsWithClassName } from "@/core/types/common";

export const ScrambledText = ({
  className,
  ...scrambleOptions
}: PropsWithClassName<UseScrambleProps>) => {
  const { ref, replay } = useScramble({
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    ...scrambleOptions,
  });

  return (
    <p ref={ref} onMouseOver={replay} onFocus={replay} className={className} />
  );
};
