'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { AnimatedTabsTrigger, Tabs, TabsList } from '@/core/components/ui/tabs';
import { HOT_KEYS } from '@/core/constants/hot-keys';
import { ABSOLUTE_ROUTES } from '@/core/constants/routes';

const TABS_LAYOUT_ID = 'navbar-tabs';

export const NavbarTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  useHotkeys(HOT_KEYS.HOME, () => {
    router.push(ABSOLUTE_ROUTES.ROOT);
  });

  useHotkeys(HOT_KEYS.BLOGS, () => {
    router.push(ABSOLUTE_ROUTES.BLOGS);
  });

  useHotkeys(HOT_KEYS.RECIPES, () => {
    router.push(ABSOLUTE_ROUTES.RECIPES);
  });

  useEffect(() => {
    router.prefetch(ABSOLUTE_ROUTES.ROOT);
    router.prefetch(ABSOLUTE_ROUTES.BLOGS);
    router.prefetch(ABSOLUTE_ROUTES.RECIPES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tabs value={pathname}>
      <TabsList>
        <AnimatedTabsTrigger
          layoutId={TABS_LAYOUT_ID}
          value={ABSOLUTE_ROUTES.ROOT}
          isActive={pathname === ABSOLUTE_ROUTES.ROOT}
          onClick={() => router.push(ABSOLUTE_ROUTES.ROOT)}
          className="cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <kbd className="hidden sm:block">[H]</kbd>
            <span className="z-50">Home</span>
          </div>
        </AnimatedTabsTrigger>

        <AnimatedTabsTrigger
          layoutId={TABS_LAYOUT_ID}
          value={ABSOLUTE_ROUTES.BLOGS}
          isActive={pathname.startsWith(ABSOLUTE_ROUTES.BLOGS)}
          onClick={() => router.push(ABSOLUTE_ROUTES.BLOGS)}
          className="cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <kbd className="hidden sm:block">[B]</kbd>
            <span className="z-50">Blogs</span>
          </div>
        </AnimatedTabsTrigger>
        <AnimatedTabsTrigger
          layoutId={TABS_LAYOUT_ID}
          value={ABSOLUTE_ROUTES.RECIPES}
          isActive={pathname.startsWith(ABSOLUTE_ROUTES.RECIPES)}
          onClick={() => router.push(ABSOLUTE_ROUTES.RECIPES)}
          className="cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <kbd className="hidden sm:block">[R]</kbd>
            <span className="z-50">Recipes</span>
          </div>
        </AnimatedTabsTrigger>
      </TabsList>
    </Tabs>
  );
};
