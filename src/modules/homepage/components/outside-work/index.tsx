import { useEffect, useRef, useState } from 'react';

import { RollingNumber } from '@/core/components/rolling-number';
import { EXTERNAL_LINKS } from '@/core/constants/external-links';
import { cn } from '@/core/lib/cn';
import { type PropsWithChildren } from '@/core/types/common';

import { SectionHeading } from '../section-heading';
import { LIFTS, LIFTS_TOTAL_KG } from './constants';

const INLINE_LINK_CLASS_NAME =
  'decoration-muted-foreground hover:decoration-foreground focus-visible:ring-ring rounded-sm underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:outline-none';

/**
 * static: the real numbers, as server-rendered (the section was on screen on
 * load, or JavaScript has not run). waiting: zeroed, below the fold. rolled:
 * rolled up to the real numbers once the section scrolled into view.
 */
type RollPhase = 'static' | 'waiting' | 'rolled';

// Share of the section that must be visible before the numbers roll
const ROLL_IN_THRESHOLD = 0.4;

interface RowProps {
  label: string;
  isLast?: boolean;
}

/** One row of the list: label on the left from 640px up, stacked on phones. */
const Row = ({ label, isLast, children }: PropsWithChildren<RowProps>) => (
  <div
    className={cn(
      'flex flex-col gap-2 py-3.5 sm:grid sm:min-h-14 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center sm:gap-x-6 sm:gap-y-0 sm:py-2',
      !isLast && 'border-border border-b'
    )}
  >
    <dt className="text-muted-foreground font-mono text-[13px]">{label}</dt>
    <dd className="leading-relaxed sm:text-[17px]">{children}</dd>
  </div>
);

export const OutsideWork = () => {
  const [phase, setPhase] = useState<RollPhase>('static');
  const sectionRef = useRef<HTMLElement | null>(null);

  // Roll the numbers up from zero the first time the section scrolls into
  // view. If it is already visible on load, keep the numbers as they are.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let isFirstCallback = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isFirstCallback) {
          isFirstCallback = false;

          if (entry.isIntersecting) observer.disconnect();
          else setPhase('waiting');

          return;
        }

        if (entry.isIntersecting) {
          setPhase('rolled');
          observer.disconnect();
        }
      },
      { threshold: ROLL_IN_THRESHOLD }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="outside-work"
      className="flex flex-col gap-2"
    >
      <SectionHeading id="outside-work" title="Outside work" />
      <dl className="flex flex-col">
        <Row label="Training">
          {/* Each lift as a small stat: mono label above the number in kg.
              The total is the sum lifters usually quote. */}
          <ul className="flex justify-between gap-x-3 tabular-nums sm:grid sm:grid-cols-4 sm:gap-x-6">
            {[
              ...LIFTS.map((lift) => ({
                key: lift.name,
                label: lift.label,
                spoken: lift.name,
                kg: lift.kg,
              })),
              {
                key: 'total',
                label: 'Total',
                spoken: 'Total',
                kg: LIFTS_TOTAL_KG,
              },
            ].map((stat) => (
              <li
                key={stat.key}
                className={cn(
                  'flex flex-col gap-0.5',
                  stat.key === 'total' && 'border-border border-l pl-3 sm:pl-6'
                )}
              >
                <span
                  aria-hidden="true"
                  className="text-muted-foreground font-mono text-[11px] tracking-wide uppercase"
                >
                  {stat.label}
                </span>
                <span className="sr-only">{stat.spoken}</span>
                <span className="flex items-baseline gap-1">
                  <strong className="text-lg leading-tight font-semibold sm:text-xl">
                    <RollingNumber
                      value={stat.kg}
                      isZeroed={phase === 'waiting'}
                      isInstant={phase === 'waiting'}
                    />
                  </strong>
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground font-mono text-xs"
                  >
                    kg
                  </span>
                  <span className="sr-only">kilograms</span>
                </span>
              </li>
            ))}
          </ul>
        </Row>
        <Row label="Reading">
          <a
            href={EXTERNAL_LINKS.DATA_INTENSIVE_BOOK}
            target="_blank"
            rel="noopener"
            className={INLINE_LINK_CLASS_NAME}
          >
            Designing Data-Intensive Applications
          </a>
        </Row>
        <Row label="Building" isLast>
          <a
            href={EXTERNAL_LINKS.STRENGTH_TRACK}
            target="_blank"
            rel="noopener"
            className={INLINE_LINK_CLASS_NAME}
          >
            Strength Track
          </a>
          <span className="text-muted-foreground">
            , a strength-training side project
          </span>
        </Row>
      </dl>
    </section>
  );
};
