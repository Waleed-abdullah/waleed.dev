"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { AnimatedTabsTrigger, Tabs, TabsList } from "@/core/components/ui/tabs";
import { ABSOLUTE_ROUTES } from "@/core/constants/routes";

const TABS_LAYOUT_ID = "navbar-tabs";

export const NavbarTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  useHotkeys("h", () => {
    router.push(ABSOLUTE_ROUTES.ROOT);
  });

  useHotkeys("b", () => {
    router.push(ABSOLUTE_ROUTES.BLOGS);
  });

  useHotkeys("r", () => {
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
        >
          <Link
            className="flex items-center gap-2 text-sm sm:text-base"
            prefetch
            href={ABSOLUTE_ROUTES.ROOT}
          >
            <kbd className="hidden sm:block">[H]</kbd>
            <span className="z-50">Home</span>
          </Link>
        </AnimatedTabsTrigger>
        <AnimatedTabsTrigger
          layoutId={TABS_LAYOUT_ID}
          value={ABSOLUTE_ROUTES.BLOGS}
          isActive={pathname === ABSOLUTE_ROUTES.BLOGS}
        >
          <Link
            className="flex items-center gap-2 text-sm sm:text-base"
            prefetch
            href={ABSOLUTE_ROUTES.BLOGS}
          >
            <kbd className="hidden sm:block">[B]</kbd>
            <span className="z-50">Blogs</span>
          </Link>
        </AnimatedTabsTrigger>
        <AnimatedTabsTrigger
          layoutId={TABS_LAYOUT_ID}
          value={ABSOLUTE_ROUTES.RECIPES}
          isActive={pathname === ABSOLUTE_ROUTES.RECIPES}
        >
          <Link
            className="flex items-center gap-2 text-sm sm:text-base"
            prefetch
            href={ABSOLUTE_ROUTES.RECIPES}
          >
            <kbd className="hidden sm:block">[R]</kbd>
            <span className="z-50">Recipes</span>
          </Link>
        </AnimatedTabsTrigger>
      </TabsList>
    </Tabs>
  );
};
