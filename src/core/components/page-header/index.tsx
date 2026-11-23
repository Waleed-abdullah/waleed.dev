import { type PropsWithChildren } from '@/core/types/common';

interface PageHeaderProps {
  title: string;
}

/** Page title with the site's "*" marker and a muted description below. */
export const PageHeader = ({
  title,
  children,
}: PropsWithChildren<PageHeaderProps>) => {
  return (
    <header className="flex flex-col gap-4">
      <h1 className="flex gap-2.5 text-[1.625rem] leading-[1.15] font-bold tracking-tight sm:text-[2.25rem]">
        <span aria-hidden="true" className="text-muted-foreground">
          *
        </span>
        <span>{title}</span>
      </h1>
      <p className="text-muted-foreground text-base leading-relaxed sm:text-[17px]">
        {children}
      </p>
    </header>
  );
};
