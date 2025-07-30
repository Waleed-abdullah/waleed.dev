import { MailIcon, ScrollText } from 'lucide-react';
import Link from 'next/link';

import { Clock } from '@/core/components/clock';
import { EXTERNAL_LINKS } from '@/core/constants/external-links';
import { GitHubIcon } from '@/core/icons/github-icon';
import { LinkedInIcon } from '@/core/icons/linkedin-icon';
import { TwitterXIcon } from '@/core/icons/twitter-x-icon';

const SOCIAL_LINKS = [
  {
    name: 'Email',
    href: EXTERNAL_LINKS.EMAIL,
    icon: <MailIcon className="size-4" />,
  },
  {
    name: 'GitHub',
    href: EXTERNAL_LINKS.GITHUB,
    icon: <GitHubIcon className="size-4" />,
  },
  {
    name: 'LinkedIn',
    href: EXTERNAL_LINKS.LINKEDIN,
    icon: <LinkedInIcon className="size-4" />,
  },
  {
    name: 'X/Twitter',
    href: EXTERNAL_LINKS.X,
    icon: <TwitterXIcon className="size-4" />,
  },
  {
    name: 'Resume',
    href: EXTERNAL_LINKS.RESUME,
    icon: <ScrollText className="size-4" />,
  },
];

export const Footer = () => {
  return (
    <footer className="border-border fixed inset-x-0 bottom-0 flex h-[var(--footer-height)] items-center justify-between border-t px-4 backdrop-blur">
      <div />

      <div className="flex items-center gap-6">
        {SOCIAL_LINKS.map((link) => (
          <Link
            title={link.name}
            key={link.name}
            href={link.href}
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={link.name}
          >
            {link.icon}
          </Link>
        ))}
      </div>

      <Clock size={24} />
    </footer>
  );
};
