import type { ComponentProps } from 'react';

import { cn } from '@/core/lib/cn';

import { CopyButton } from './copy-button';

interface CodeBlockProps extends ComponentProps<'pre'> {
  /** The raw source of the code block, copied by the copy button */
  raw: string;
  /** The fence language, shown in the header */
  language?: string;
}

/**
 * Renders a code block that was highlighted at build time by `@shikijs/rehype`,
 * with a header holding the language and a copy button. Long lines scroll
 * horizontally instead of wrapping.
 */
export const CodeBlock = ({
  raw,
  language,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  return (
    <figure className="border-border my-6 overflow-hidden rounded-xl border">
      <figcaption className="border-border bg-muted/50 flex h-11 items-center justify-between border-b pl-4">
        <span className="text-muted-foreground font-mono text-xs">
          {language}
        </span>
        <CopyButton content={raw} />
      </figcaption>
      <pre
        {...props}
        className={cn(
          className,
          'overflow-x-auto p-4 font-mono text-[13px] leading-relaxed [tab-size:2] sm:text-sm'
        )}
      >
        {children}
      </pre>
    </figure>
  );
};
