import Link from 'next/link';

const DATA_INTENSIVE_BOOK_URL =
  'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/';

const STRANGTH_TRACK_URL = 'https://strength-track.com';

export const Intro = () => {
  return (
    <p className="text-secondary-foreground text-sm sm:text-base">
      Hi there, I am a 22 year old Software Engineer, who loves Computer
      Science, Currently I would say I am pretty good at Frontend Development,
      however I really love Backend and ML as well. Currently, Learning about
      System design and handling Data-intensive applications (Yes, I am reading
      <Link
        href={DATA_INTENSIVE_BOOK_URL}
        className="link-underline text-muted-foreground ml-1"
        target="_blank"
      >
        Designing Data-Intensive Applications
      </Link>
      ). Other than that, I love going to the gym. Also building{' '}
      <Link
        href={STRANGTH_TRACK_URL}
        className="link-underline text-muted-foreground ml-1"
        target="_blank"
      >
        Strangth track
      </Link>{' '}
      on the side.
    </p>
  );
};
