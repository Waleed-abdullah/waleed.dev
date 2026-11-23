import { Link } from '@tanstack/react-router';

import { type ABSOLUTE_ROUTES } from '@/core/constants/routes';

interface SectionHeadingProps {
  id: string;
  title: string;
  action?: {
    to: typeof ABSOLUTE_ROUTES.BLOGS | typeof ABSOLUTE_ROUTES.RECIPES;
    label: string;
  };
}

/** Small mono section label with a rule, e.g. "* WORK ———" */
export const SectionHeading = ({ id, title, action }: SectionHeadingProps) => {
  return (
    <div className="flex items-center gap-3">
      <h2
        id={id}
        className="text-muted-foreground flex flex-1 items-center gap-3 font-mono text-[13px] font-medium tracking-[0.08em] uppercase"
      >
        <span aria-hidden="true">*</span>
        {title}
        <span aria-hidden="true" className="bg-border h-px flex-1" />
      </h2>
      {action && (
        <Link
          to={action.to}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring flex min-h-11 items-center rounded-sm text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="link-underline">{action.label}</span>
        </Link>
      )}
    </div>
  );
};
