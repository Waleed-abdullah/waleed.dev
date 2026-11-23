import { cn } from '@/core/lib/cn';
import { type PropsWithClassName } from '@/core/types/common';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

// Each digit starts a little after the one to its left, so the number rolls
// from left to right.
const DIGIT_STAGGER_MS = 60;

interface RollingNumberProps extends PropsWithClassName {
  value: number;
  /** Show every digit as 0 (e.g. before the number scrolls into view) */
  isZeroed?: boolean;
  /** Jump to the value without animating */
  isInstant?: boolean;
}

/**
 * A whole number whose digits roll like an odometer when the value changes.
 * The digits are decorative; screen readers get the plain value.
 */
export const RollingNumber = ({
  value,
  isZeroed = false,
  isInstant = false,
  className,
}: RollingNumberProps) => {
  const digits = String(Math.round(value)).split('').map(Number);

  return (
    <span className={cn('inline-flex tabular-nums', className)}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex">
        {digits.map((digit, index) => {
          const shown = isZeroed ? 0 : digit;

          return (
            // Keyed from the right so the ones digit stays the same column
            // when the number of digits changes.
            <span
              key={digits.length - index}
              className="relative inline-block [clip-path:inset(0)]"
            >
              {/* Keeps the column's width and text baseline */}
              <span className="invisible">{digit}</span>
              <span
                className={cn(
                  'absolute inset-x-0 top-0 flex flex-col',
                  !isInstant &&
                    'transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none'
                )}
                style={{
                  transform: `translateY(-${shown * 10}%)`,
                  transitionDelay: isInstant
                    ? undefined
                    : `${index * DIGIT_STAGGER_MS}ms`,
                }}
              >
                {DIGITS.map((option) => (
                  <span key={option}>{option}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
};
