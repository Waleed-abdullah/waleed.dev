import type { ComponentProps } from 'react';

import { cn } from '@/core/lib/cn';

import { CopyButton } from './copy-button';

interface CodeBlockProps extends ComponentProps<'pre'> {
  /** The raw source of the code block, copied by the copy button */
  raw: string;
}

/**
 * Renders a code block that was highlighted at build time by `@shikijs/rehype`.
 */
export const CodeBlock = ({
  raw,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  return (
    <pre
      {...props}
      className={cn(
        className,
        'relative min-h-9 rounded-sm p-2 break-all whitespace-pre-wrap'
      )}
    >
      {children}
      <CopyButton content={raw} />
    </pre>
  );
};
