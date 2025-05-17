import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    ...components,
    Image: (props) => <Image {...props} alt={props.alt} className="my-4" />,
    h1: (props) => (
      <h1
        {...props}
        className="text-2xl md:text-4xl font-bold tracking-tight mt-8 mb-4"
      />
    ),
    h2: (props) => (
      <h2
        {...props}
        className="text-xl md:text-3xl font-semibold tracking-tight mt-8 mb-4"
      />
    ),
    h3: (props) => (
      <h3
        {...props}
        className="text-lg md:text-2xl font-semibold tracking-tight scroll-m-20 mt-6 mb-3"
      />
    ),
    h4: (props) => (
      <h4
        {...props}
        className="text-base md:text-xl font-semibold tracking-tight scroll-m-20 mt-6 mb-3"
      />
    ),
    p: (props) => <p {...props} className="text-sm md:text-base my-2" />,
    ul: (props) => <ul {...props} className="list-disc my-4 ml-6" />,
    ol: (props) => <ol {...props} className="list-decimal my-4 ml-6" />,
    li: (props) => <li {...props} className="text-sm md:text-base my-1" />,
    blockquote: (props) => (
      <blockquote
        {...props}
        className="border-l-2 pl-4 md:pl-6 italic text-sm md:text-base [&>*]:text-muted-foreground my-6"
      />
    ),
    code: (props) => (
      <code
        {...props}
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs md:text-sm font-semibold"
      />
    ),
    pre: (props) => (
      <pre
        {...props}
        className="overflow-x-auto rounded-lg border bg-black py-3 md:py-4 text-sm md:text-base my-6"
      />
    ),
  };
};
