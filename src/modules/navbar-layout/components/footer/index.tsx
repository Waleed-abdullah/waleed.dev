import { MailIcon, ScrollText } from "lucide-react";
import Link from "next/link";

import { EXTERNAL_LINKS } from "@/core/constants/external-links";
import { GitHubIcon } from "@/core/icons/github-icon";
import { LinkedInIcon } from "@/core/icons/linkedin-icon";
import { TwitterXIcon } from "@/core/icons/twitter-x-icon";

const SOCIAL_LINKS = [
  {
    name: "Email",
    href: EXTERNAL_LINKS.EMAIL,
    icon: <MailIcon className="size-4" />,
  },
  {
    name: "GitHub",
    href: EXTERNAL_LINKS.GITHUB,
    icon: <GitHubIcon className="size-4" />,
  },
  {
    name: "LinkedIn",
    href: EXTERNAL_LINKS.LINKEDIN,
    icon: <LinkedInIcon className="size-4" />,
  },
  {
    name: "X/Twitter",
    href: EXTERNAL_LINKS.X,
    icon: <TwitterXIcon className="size-4" />,
  },
  {
    name: "Resume",
    href: EXTERNAL_LINKS.RESUME,
    icon: <ScrollText className="size-4" />,
  },
];

export const Footer = () => {
  return (
    <footer className="fixed flex items-center justify-center h-[var(--footer-height)] bottom-0 inset-x-0 backdrop-blur border-t border-border px-4">
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
    </footer>
  );
};
