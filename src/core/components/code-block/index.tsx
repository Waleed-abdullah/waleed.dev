import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { type BundledLanguage, type BundledTheme, codeToHast } from "shiki";

import { cn } from "@/core/lib/cn";

import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  children: string;
  language?: BundledLanguage;
  theme?: BundledTheme;
}

export const CodeBlock = async ({
  children,
  language,
  theme,
}: CodeBlockProps) => {
  const hast = await codeToHast(children, {
    theme: theme ?? "houston",
    lang: language ?? "",
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props) => (
        <pre
          {...props}
          className={cn(props.className, "min-h-9 p-1.5 rounded-sm relative")}
        >
          {props.children}
          <CopyButton content={children} />
        </pre>
      ),
    },
  });
};
