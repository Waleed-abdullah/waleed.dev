import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { type BundledLanguage, type BundledTheme, codeToHast } from 'shiki';

import { cn } from '@/core/lib/cn';

import { CopyButton } from './copy-button';

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
    theme: theme ?? 'houston',
    lang: language ?? '',
    mergeWhitespaces: true,
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props) => (
        <pre
          {...props}
          className={cn(
            props.className,
            'relative min-h-9 rounded-sm p-2 whitespace-pre-wrap'
          )}
        >
          {props.children}
          <CopyButton content={children} />
        </pre>
      ),
    },
  });
};
