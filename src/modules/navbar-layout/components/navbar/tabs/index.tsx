"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { AnimatedTabsTrigger, Tabs, TabsList } from "@/core/components/ui/tabs";
import { ABSOLUTE_ROUTES } from "@/core/constants/routes";

export const NavbarTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  useHotkeys("h", () => {
    router.push(ABSOLUTE_ROUTES.ROOT);
  });

  useHotkeys("b", () => {
    router.push(ABSOLUTE_ROUTES.BLOGS);
  });

  useHotkeys("p", () => {
    router.push(ABSOLUTE_ROUTES.PROJECTS);
  });

  useEffect(() => {
    router.prefetch(ABSOLUTE_ROUTES.ROOT);
    router.prefetch(ABSOLUTE_ROUTES.BLOGS);
    router.prefetch(ABSOLUTE_ROUTES.PROJECTS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tabs value={pathname}>
      <TabsList>
        <AnimatedTabsTrigger
          value={ABSOLUTE_ROUTES.ROOT}
          isActive={pathname === ABSOLUTE_ROUTES.ROOT}
        >
          <Link
            className="flex items-center gap-2"
            prefetch
            href={ABSOLUTE_ROUTES.ROOT}
          >
            <kbd>[H]</kbd>
            <span className="z-50">Home</span>
          </Link>
        </AnimatedTabsTrigger>
        <AnimatedTabsTrigger
          value={ABSOLUTE_ROUTES.BLOGS}
          isActive={pathname === ABSOLUTE_ROUTES.BLOGS}
        >
          <Link
            className="flex items-center gap-2"
            prefetch
            href={ABSOLUTE_ROUTES.BLOGS}
          >
            <kbd>[B]</kbd>
            <span className="z-50">Blogs</span>
          </Link>
        </AnimatedTabsTrigger>
        <AnimatedTabsTrigger
          value={ABSOLUTE_ROUTES.PROJECTS}
          isActive={pathname === ABSOLUTE_ROUTES.PROJECTS}
        >
          <Link
            className="flex items-center gap-2"
            prefetch
            href={ABSOLUTE_ROUTES.PROJECTS}
          >
            <kbd>[P]</kbd>
            <span className="z-50">Projects</span>
          </Link>
        </AnimatedTabsTrigger>
      </TabsList>
    </Tabs>
  );
};
