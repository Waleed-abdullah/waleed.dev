import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/core/lib/cn';
import { type PropsWithClassName } from '@/core/types/common';

import { Button } from '../../ui/button';

const COPIED_RESET_DELAY = 2000;

interface CopyButtonProps extends PropsWithClassName {
  content: string;
}

export const CopyButton = ({ className, content }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content.replace(/\n$/, ''));
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => setCopied(false), COPIED_RESET_DELAY);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Button
      variant="ghost"
      className={cn(
        'text-muted-foreground hover:text-foreground h-11 gap-1.5 rounded-none px-4 font-mono text-xs font-normal hover:bg-transparent',
        className
      )}
      onClick={copyToClipboard}
    >
      {copied ? (
        <Check aria-hidden="true" className="size-3.5" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5" />
      )}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </Button>
  );
};
