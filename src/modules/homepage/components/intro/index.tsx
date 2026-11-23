const DATA_INTENSIVE_BOOK_URL =
  'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/';

const STRANGTH_TRACK_URL = 'https://strength-track.com';

export const Intro = () => {
  return (
    <p className="text-secondary-foreground text-sm leading-relaxed sm:text-base">
      Hi there, I am a Software Engineer, who loves Computer Science, Currently
      I would say I am pretty good at Frontend Development, however I really
      love Backend and ML as well. Currently, Learning about System design and
      handling Data-intensive applications (Yes, I am reading{' '}
      <a
        href={DATA_INTENSIVE_BOOK_URL}
        className="link-underline text-muted-foreground"
        target="_blank"
        rel="noopener"
      >
        Designing Data-Intensive Applications
      </a>
      ). Other than that, I love going to the gym. Also building{' '}
      <a
        href={STRANGTH_TRACK_URL}
        className="link-underline text-muted-foreground"
        target="_blank"
        rel="noopener"
      >
        Strangth track
      </a>{' '}
      on the side.
    </p>
  );
};
