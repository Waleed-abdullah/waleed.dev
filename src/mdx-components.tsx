import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

import { CodeBlock } from './core/components/code-block';
import { cn } from './core/lib/cn';

type CodeBlockMarkerProps = {
  /** Set on the <pre> of a highlighted block by the shiki transformer in vite.config.mts */
  'data-raw'?: string;
  /** Set on the <code> of a highlighted block by the shiki transformer in vite.config.mts */
  'data-code-block'?: string;
};

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
        className="my-4 rounded-md"
      />
    ),
    h1: (props) => (
      <h1
        {...props}
        className="mt-8 mb-3 text-2xl font-bold tracking-tight md:text-4xl"
      />
    ),
    h2: (props) => (
      <h2
        {...props}
        className="mt-8 mb-3 text-xl font-semibold tracking-tight md:text-3xl"
      />
    ),
    h3: (props) => (
      <h3
        {...props}
        className="mt-6 mb-3 scroll-m-20 text-lg font-semibold tracking-tight md:text-2xl"
      />
    ),
    h4: (props) => (
      <h4
        {...props}
        className="mt-6 mb-3 scroll-m-20 text-base font-semibold tracking-tight md:text-xl"
      />
    ),
    h5: (props) => (
      <h5
        {...props}
        className="mt-6 mb-3 scroll-m-20 text-base font-semibold tracking-tight md:text-lg"
      />
    ),
    h6: (props) => (
      <h6
        {...props}
        className="mt-6 mb-3 scroll-m-20 text-lg font-semibold tracking-tight"
      />
    ),
    p: (props) => (
      <p {...props} className="my-3 text-sm leading-relaxed md:text-base" />
    ),
    ul: (props) => <ul {...props} className="my-2 ml-4 list-disc" />,
    ol: (props) => <ol {...props} className="my-2 ml-4 list-decimal" />,
    li: (props) => (
      <li {...props} className="my-1.5 text-sm leading-relaxed md:text-base" />
    ),
    blockquote: (props) => (
      <blockquote
        {...props}
        className="[&>*]:text-muted-foreground my-6 border-l-2 pl-4 text-sm italic md:pl-6 md:text-base"
      />
    ),
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
            'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold break-all'
          )}
        />
      );
    },
    pre: ({
      'data-raw': raw,
      ...props
    }: ComponentProps<'pre'> & CodeBlockMarkerProps) => {
      if (raw === undefined) {
        return <pre {...props} className={cn(props.className, 'my-1')} />;
      }

      return (
        <pre className="my-1">
          <CodeBlock {...props} raw={raw} />
        </pre>
      );
    },
    a: (props) => (
      <a
        {...props}
        className={cn(props.className, 'link-underline text-muted-foreground')}
      />
    ),
  };
};
