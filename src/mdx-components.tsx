import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { type BundledLanguage } from "shiki";

import { CodeBlock } from "./core/components/code-block";
import { cn } from "./core/lib/cn";

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
        className="text-2xl md:text-4xl font-bold tracking-tight mt-6 mb-2"
      />
    ),
    h2: (props) => (
      <h2
        {...props}
        className="text-xl md:text-3xl font-semibold tracking-tight mt-6 mb-2"
      />
    ),
    h3: (props) => (
      <h3
        {...props}
        className="text-lg md:text-2xl font-semibold tracking-tight scroll-m-20 mt-4 mb-2"
      />
    ),
    h4: (props) => (
      <h4
        {...props}
        className="text-base md:text-xl font-semibold tracking-tight scroll-m-20 mt-4 mb-2"
      />
    ),
    h5: (props) => (
      <h5
        {...props}
        className="text-base md:text-lg font-semibold tracking-tight scroll-m-20 mt-4 mb-2"
      />
    ),
    h6: (props) => (
      <h6
        {...props}
        className="text-lg font-semibold tracking-tight scroll-m-20 mt-4 mb-2"
      />
    ),
    p: (props) => <p {...props} className="text-sm md:text-base my-2" />,
    ul: (props) => <ul {...props} className="list-disc my-1 ml-6" />,
    ol: (props) => <ol {...props} className="list-decimal my-1 ml-6" />,
    li: (props) => <li {...props} className="text-sm md:text-base my-1" />,
    blockquote: (props) => (
      <blockquote
        {...props}
        className="border-l-2 pl-4 md:pl-6 italic text-sm md:text-base [&>*]:text-muted-foreground my-6"
      />
    ),
    code: async (props) => {
      const { children, className } = props;
      const language = className?.split("-")[1] as BundledLanguage;
      if (!language) {
        return (
          <code
            {...props}
            className={cn(
              props.className,
              "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
            )}
          />
        );
      }

      return <CodeBlock language={language}>{children}</CodeBlock>;
    },
    pre: (props) => <pre {...props} className={cn(props.className, "my-1")} />,
    a: (props) => (
      <a
        {...props}
        className={cn(props.className, "link-underline text-muted-foreground")}
      />
    ),
  };
};
