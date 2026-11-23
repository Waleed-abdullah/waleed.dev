import { createFileRoute, Outlet } from '@tanstack/react-router';

import { NavbarLayout } from '@/modules/navbar-layout';

const Layout = () => {
  return (
    <NavbarLayout>
      <Outlet />
    </NavbarLayout>
  );
};

export const Route = createFileRoute('/_with-navbar')({
  component: Layout,
});
