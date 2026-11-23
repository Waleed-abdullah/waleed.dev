import { EXTERNAL_LINKS } from '@/core/constants/external-links';

const INLINE_LINK_CLASS_NAME =
  'decoration-muted-foreground hover:decoration-foreground focus-visible:ring-ring rounded-sm underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:outline-none';

export const Intro = () => {
  return (
    <p className="text-base leading-relaxed sm:text-[17px] sm:leading-[1.75]">
      I build web products end to end, with most of my experience on the
      frontend: application architecture, design systems and performance work
      for AI products. I also work across the backend and ML, and I am currently
      going deeper on system design and data-intensive applications (reading{' '}
      <a
        href={EXTERNAL_LINKS.DATA_INTENSIVE_BOOK}
        className={INLINE_LINK_CLASS_NAME}
        target="_blank"
        rel="noopener"
      >
        Designing Data-Intensive Applications
      </a>
      ). Outside of work I train at the gym and build{' '}
      <a
        href={EXTERNAL_LINKS.STRENGTH_TRACK}
        className={INLINE_LINK_CLASS_NAME}
        target="_blank"
        rel="noopener"
      >
        Strength Track
      </a>{' '}
      on the side.
    </p>
  );
};
