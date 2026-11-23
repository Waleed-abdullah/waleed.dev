import { MailIcon, ScrollText } from 'lucide-react';

import { Clock } from '@/core/components/clock';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/core/components/ui/tooltip';
import { EXTERNAL_LINKS } from '@/core/constants/external-links';
import { GitHubIcon } from '@/core/icons/github-icon';
import { LinkedInIcon } from '@/core/icons/linkedin-icon';
import { TwitterXIcon } from '@/core/icons/twitter-x-icon';
import { cn } from '@/core/lib/cn';

/*
 * On hover and keyboard focus each icon lifts slightly and takes its brand
 * color. GitHub and X are black and white marks, so they go to full contrast
 * (black in light mode, white in dark mode). Email uses Gmail red, and the
 * resume a warm amber.
 */
const SOCIAL_LINKS = [
  {
    name: 'Email',
    href: EXTERNAL_LINKS.EMAIL,
    icon: <MailIcon className="size-4" />,
    hoverClassName: 'hover:text-[#EA4335] focus-visible:text-[#EA4335]',
  },
  {
    name: 'GitHub',
    href: EXTERNAL_LINKS.GITHUB,
    icon: <GitHubIcon className="size-4" />,
    hoverClassName:
      'hover:text-[#181717] focus-visible:text-[#181717] dark:hover:text-white dark:focus-visible:text-white',
  },
  {
    name: 'LinkedIn',
    href: EXTERNAL_LINKS.LINKEDIN,
    icon: <LinkedInIcon className="size-4" />,
    hoverClassName: 'hover:text-[#0A66C2] focus-visible:text-[#0A66C2]',
  },
  {
    name: 'X/Twitter',
    href: EXTERNAL_LINKS.X,
    icon: <TwitterXIcon className="size-4" />,
    hoverClassName:
      'hover:text-black focus-visible:text-black dark:hover:text-white dark:focus-visible:text-white',
  },
  {
    name: 'Resume',
    href: EXTERNAL_LINKS.RESUME,
    icon: <ScrollText className="size-4" />,
    hoverClassName:
      'hover:text-[#D97706] focus-visible:text-[#D97706] dark:hover:text-[#F59E0B] dark:focus-visible:text-[#F59E0B]',
  },
];

export const Footer = () => {
  return (
    <footer className="border-border bg-background/80 fixed inset-x-0 bottom-0 flex h-[var(--footer-offset)] items-center justify-between border-t px-6 pb-[env(safe-area-inset-bottom)] backdrop-blur [view-transition-name:site-footer]">
      <div />

      <div className="flex items-center gap-6">
        {SOCIAL_LINKS.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener"
                className={cn(
                  'group text-muted-foreground focus-visible:ring-ring -m-3 flex rounded-md p-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none',
                  link.hoverClassName
                )}
                aria-label={link.name}
              >
                <span className="flex transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-0.5 group-hover:scale-115 group-focus-visible:-translate-y-0.5 group-focus-visible:scale-115 motion-reduce:transition-none">
                  {link.icon}
                </span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="top">{link.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <Clock size={24} />
    </footer>
  );
};
