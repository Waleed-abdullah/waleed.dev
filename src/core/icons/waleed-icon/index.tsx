import type { CSSProperties } from 'react';

import type { PropsWithClassName } from '@/core/types/common';

// Dot centers in writing order (down the left stroke, up the right).
const DOTS = [
  [5.5, 8.5],
  [6.5, 11.5],
  [7.5, 14.5],
  [8.5, 17.5],
  [11.5, 15.5],
  [13.5, 12.5],
  [15.5, 9.5],
] as const;

// --dot-index staggers the hover pulse (see .waleed-icon-dot in globals.css).
const dotStyle = (index: number) => ({ '--dot-index': index }) as CSSProperties;

export const WaleedIcon = ({ className }: PropsWithClassName) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {DOTS.map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r="1.5"
          fill="currentColor"
          className="waleed-icon-dot"
          style={dotStyle(index)}
        />
      ))}
      <path
        d="M20 12.5C20 13.3284 19.3284 14 18.5 14C17.6716 14 17 13.3284 17 12.5C17 11 17 11 18.5 11C19.3284 11 20 11.6716 20 12.5Z"
        fill="currentColor"
        className="waleed-icon-dot"
        style={dotStyle(DOTS.length)}
        data-last-dot=""
      />
    </svg>
  );
};
