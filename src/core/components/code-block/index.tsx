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

export const CodeBlock = async ({ children, language }: CodeBlockProps) => {
  const hast = await codeToHast(children, {
    lang: language ?? '',
    themes: {
      light: 'one-light',
      dark: 'slack-dark',
    },

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
            'relative min-h-9 rounded-sm p-2 break-all whitespace-pre-wrap'
          )}
        >
          {props.children}
          <CopyButton content={children} />
        </pre>
      ),
    },
  });
};
