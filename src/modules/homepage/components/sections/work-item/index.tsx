import { type WorkItem as WorkItemType } from '../types';

interface WorkItemProps {
  item: WorkItemType;
}

export const WorkItem = ({ item }: WorkItemProps) => {
  return (
    <article className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold sm:text-xl">
          <a
            href={item.link}
            target="_blank"
            rel="noopener"
            className="link-underline focus-visible:ring-ring relative rounded-sm after:absolute after:inset-x-0 after:-inset-y-2.5 focus-visible:ring-2 focus-visible:outline-none"
          >
            {item.company}
          </a>
        </h3>
        <p className="text-muted-foreground font-mono text-[13px]">
          {item.period}
        </p>
      </div>
      <p className="text-muted-foreground text-[15px]">{item.role}</p>
      <ul className="marker:text-muted-foreground mt-1 ml-5 flex list-disc flex-col gap-2 leading-relaxed sm:text-[17px]">
        {item.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  );
};
