import {
  Link,
  useLocation,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { HOT_KEYS } from '@/core/constants/hot-keys';
import { ABSOLUTE_ROUTES } from '@/core/constants/routes';
import { cn } from '@/core/lib/cn';

const ACTIVE_INDICATOR_LAYOUT_ID = 'navbar-active-indicator';

const NAV_ITEMS = [
  {
    to: ABSOLUTE_ROUTES.ROOT,
    label: 'Home',
    hotkey: HOT_KEYS.HOME,
    isActive: (pathname: string) => pathname === ABSOLUTE_ROUTES.ROOT,
  },
  {
    to: ABSOLUTE_ROUTES.BLOGS,
    label: 'Blogs',
    hotkey: HOT_KEYS.BLOGS,
    isActive: (pathname: string) => pathname.startsWith(ABSOLUTE_ROUTES.BLOGS),
  },
  {
    to: ABSOLUTE_ROUTES.RECIPES,
    label: 'Recipes',
    hotkey: HOT_KEYS.RECIPES,
    isActive: (pathname: string) =>
      pathname.startsWith(ABSOLUTE_ROUTES.RECIPES),
  },
] as const;

export const NavbarTabs = () => {
  const pathname = useLocation({ select: (location) => location.pathname });
  const router = useRouter();
  const navigate = useNavigate();

  useHotkeys(HOT_KEYS.HOME, () => {
    navigate({ to: ABSOLUTE_ROUTES.ROOT });
  });

  useHotkeys(HOT_KEYS.BLOGS, () => {
    navigate({ to: ABSOLUTE_ROUTES.BLOGS });
  });

  useHotkeys(HOT_KEYS.RECIPES, () => {
    navigate({ to: ABSOLUTE_ROUTES.RECIPES });
  });

  useEffect(() => {
    router.preloadRoute({ to: ABSOLUTE_ROUTES.ROOT });
    router.preloadRoute({ to: ABSOLUTE_ROUTES.BLOGS });
    router.preloadRoute({ to: ABSOLUTE_ROUTES.RECIPES });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="flex items-center">
      {NAV_ITEMS.map((item) => {
        const isActive = item.isActive(pathname);

        return (
          <li key={item.to}>
            <Link
              to={item.to}
              activeOptions={{ exact: item.to === ABSOLUTE_ROUTES.ROOT }}
              className={cn(
                'focus-visible:ring-ring relative flex h-11 items-center gap-2 rounded-md px-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none sm:px-3.5 sm:text-[15px]',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <kbd className="text-muted-foreground hidden font-mono text-xs font-normal uppercase sm:inline">
                {item.hotkey}
              </kbd>
              {item.label}
              {isActive && (
                <motion.span
                  layoutId={ACTIVE_INDICATOR_LAYOUT_ID}
                  aria-hidden="true"
                  className="bg-foreground absolute inset-x-2.5 bottom-0.5 h-0.5 rounded-full sm:inset-x-3.5"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
