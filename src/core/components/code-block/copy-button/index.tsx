'use client';

import { Copy } from 'lucide-react';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/core/lib/cn';
import { type PropsWithClassName } from '@/core/types/common';

import { Button } from '../../ui/button';

interface CopyButtonProps extends PropsWithClassName {
  content: string;
}

export const CopyButton = ({ className, content }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(className, 'absolute top-0.5 right-0.5 size-8')}
      onClick={copyToClipboard}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  );
};
