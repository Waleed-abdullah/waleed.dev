import { ArrowUpRight, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';

import { cn } from '@/core/lib/cn';

import { type ProjectItem as ProjectItemType } from '../types';

interface ProjectItemProps {
  project: ProjectItemType;
}

export const ProjectItem = ({ project }: ProjectItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className="border-border flex flex-col gap-2.5 border-b py-7 first:pt-0 last:border-b-0 last:pb-0">
      <h3 className="text-lg font-semibold sm:text-xl">
        <a
          href={project.link}
          target="_blank"
          rel="noopener"
          className="group focus-visible:ring-ring relative inline-flex items-center gap-2 rounded-sm after:absolute after:inset-x-0 after:-inset-y-2 focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="link-underline link-underline-group">
            {project.title}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </h3>
      <p className="text-muted-foreground text-[15px]">{project.subtitle}</p>
      <p className="leading-relaxed sm:text-[17px]">{project.summary}</p>

      {project.stats && (
        <dl className="mt-1 flex flex-wrap gap-x-10 gap-y-3">
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="text-muted-foreground text-[13px]">
                {stat.label}
              </dt>
              <dd className="text-2xl leading-tight font-semibold tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <ul
        aria-label="Stack"
        className="mt-1 flex flex-wrap gap-1.5 font-mono text-xs"
      >
        {project.stack.map((item) => (
          <li
            key={item}
            className="bg-muted border-border rounded-md border px-2 py-0.5"
          >
            {item}
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={isExpanded ? detailsId : undefined}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -ml-1 inline-flex min-h-11 cursor-pointer items-center gap-1.5 self-start rounded-sm px-1 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <Plus
          aria-hidden="true"
          className={cn(
            'size-3.5 transition-transform duration-200',
            isExpanded && 'rotate-45'
          )}
        />
        {isExpanded ? 'Hide details' : project.detailsLabel}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={detailsId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="text-muted-foreground marker:text-muted-foreground ml-5 flex list-disc flex-col gap-2 pb-1 leading-relaxed sm:text-[17px]">
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
