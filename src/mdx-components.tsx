import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

import { CodeBlock } from './core/components/code-block';
import { cn } from './core/lib/cn';

type CodeBlockMarkerProps = {
  /** Set on the <pre> of a highlighted block by the shiki transformer in vite.config.mts */
  'data-raw'?: string;
  /** Set on the <pre> of a highlighted block by the shiki transformer in vite.config.mts */
  'data-language'?: string;
  /** Set on the <code> of a highlighted block by the shiki transformer in vite.config.mts */
  'data-code-block'?: string;
};

// Headings get ids from plugins/remark-heading-ids.mts. scroll-mt keeps them
// clear of the fixed navbar when linked to.
const HEADING_CLASS_NAME = 'scroll-mt-24 font-semibold tracking-tight';

const BODY_TEXT_CLASS_NAME = 'text-base leading-[1.75] sm:text-[17px]';

export const useMDXComponents = (components?: MDXComponents): MDXComponents => {
  return {
    ...components,
    img: (props) => (
      <img
        {...props}
        alt={props.alt}
        height={300}
        width={300}
        loading="lazy"
        decoding="async"
        className="border-border my-6 h-auto max-w-full rounded-lg border"
      />
    ),
    h1: (props) => (
      <h1
        {...props}
        className={cn(HEADING_CLASS_NAME, 'mt-12 mb-4 text-3xl sm:text-4xl')}
      />
    ),
    h2: (props) => (
      <h2
        {...props}
        className={cn(
          HEADING_CLASS_NAME,
          'mt-12 mb-4 text-[1.375rem] leading-tight sm:text-[1.75rem]'
        )}
      />
    ),
    h3: (props) => (
      <h3
        {...props}
        className={cn(
          HEADING_CLASS_NAME,
          'mt-10 mb-3 text-lg leading-snug sm:text-[1.375rem]'
        )}
      />
    ),
    h4: (props) => (
      <h4 {...props} className={cn(HEADING_CLASS_NAME, 'mt-8 mb-3 text-lg')} />
    ),
    h5: (props) => (
      <h5
        {...props}
        className={cn(HEADING_CLASS_NAME, 'mt-8 mb-3 text-base')}
      />
    ),
    h6: (props) => (
      <h6
        {...props}
        className={cn(
          HEADING_CLASS_NAME,
          'text-muted-foreground mt-8 mb-3 text-base'
        )}
      />
    ),
    p: (props) => <p {...props} className={cn(BODY_TEXT_CLASS_NAME, 'my-5')} />,
    ul: (props) => (
      <ul
        {...props}
        className="marker:text-muted-foreground my-5 ml-5 flex list-disc flex-col gap-2"
      />
    ),
    ol: (props) => (
      <ol
        {...props}
        className="marker:text-muted-foreground my-5 ml-5 flex list-decimal flex-col gap-2"
      />
    ),
    li: (props) => (
      <li {...props} className={cn(BODY_TEXT_CLASS_NAME, 'pl-1 [&>p]:my-1')} />
    ),
    blockquote: (props) => (
      <blockquote
        {...props}
        className="border-foreground text-muted-foreground my-8 border-l-2 pl-5 italic [&>p]:my-2"
      />
    ),
    hr: (props) => <hr {...props} className="border-border my-12" />,
    code: ({
      'data-code-block': codeBlock,
      ...props
    }: ComponentProps<'code'> & CodeBlockMarkerProps) => {
      if (codeBlock !== undefined) {
        return <code {...props} />;
      }

      return (
        <code
          {...props}
          className={cn(
            props.className,
            'bg-muted relative rounded px-[0.35rem] py-[0.15rem] font-mono text-[0.875em] font-medium break-words'
          )}
        />
      );
    },
    pre: ({
      'data-raw': raw,
      'data-language': language,
      ...props
    }: ComponentProps<'pre'> & CodeBlockMarkerProps) => {
      if (raw === undefined) {
        return (
          <pre
            {...props}
            className={cn(
              props.className,
              'my-6 overflow-x-auto rounded-xl p-4 font-mono text-sm'
            )}
          />
        );
      }

      return <CodeBlock {...props} raw={raw} language={language} />;
    },
    a: (props) => (
      <a
        // External links open in a new tab, like the rest of the site
        {...(/^https?:\/\//.test(props.href ?? '') && {
          target: '_blank',
          rel: 'noopener',
        })}
        {...props}
        className={cn(
          props.className,
          'decoration-muted-foreground hover:decoration-foreground focus-visible:ring-ring rounded-sm underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:outline-none'
        )}
      />
    ),
  };
};
