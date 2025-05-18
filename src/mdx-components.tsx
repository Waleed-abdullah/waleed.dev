import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { type BundledLanguage } from 'shiki';

import { CodeBlock } from './core/components/code-block';
import { cn } from './core/lib/cn';

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    ...components,
    img: (props) => (
      <Image
        {...props}
        alt={props.alt}
        height={300}
        width={300}
        className="my-4 rounded-md"
      />
    ),
    h1: (props) => (
      <h1
        {...props}
        className="mt-6 mb-2 text-2xl font-bold tracking-tight md:text-4xl"
      />
    ),
    h2: (props) => (
      <h2
        {...props}
        className="mt-6 mb-2 text-xl font-semibold tracking-tight md:text-3xl"
      />
    ),
    h3: (props) => (
      <h3
        {...props}
        className="mt-4 mb-2 scroll-m-20 text-lg font-semibold tracking-tight md:text-2xl"
      />
    ),
    h4: (props) => (
      <h4
        {...props}
        className="mt-4 mb-2 scroll-m-20 text-base font-semibold tracking-tight md:text-xl"
      />
    ),
    h5: (props) => (
      <h5
        {...props}
        className="mt-4 mb-2 scroll-m-20 text-base font-semibold tracking-tight md:text-lg"
      />
    ),
    h6: (props) => (
      <h6
        {...props}
        className="mt-4 mb-2 scroll-m-20 text-lg font-semibold tracking-tight"
      />
    ),
    p: (props) => <p {...props} className="my-2 text-sm md:text-base" />,
    ul: (props) => <ul {...props} className="my-1 ml-4 list-disc" />,
    ol: (props) => <ol {...props} className="my-1 ml-4 list-decimal" />,
    li: (props) => <li {...props} className="my-1 text-sm md:text-base" />,
    blockquote: (props) => (
      <blockquote
        {...props}
        className="[&>*]:text-muted-foreground my-6 border-l-2 pl-4 text-sm italic md:pl-6 md:text-base"
      />
    ),
    code: async (props) => {
      const { children, className } = props;
      const language = className?.split('-')[1] as BundledLanguage;
      if (!language) {
        return (
          <code
            {...props}
            className={cn(
              props.className,
              'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold break-all'
            )}
          />
        );
      }

      return <CodeBlock language={language}>{children}</CodeBlock>;
    },
    pre: (props) => <pre {...props} className={cn(props.className, 'my-1')} />,
    a: (props) => (
      <a
        {...props}
        className={cn(props.className, 'link-underline text-muted-foreground')}
      />
    ),
  };
};
