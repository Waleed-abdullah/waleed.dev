import { type PropsWithChildren } from '@/core/types/common';
import { NavbarLayout } from '@/modules/navbar-layout';

const Layout = ({ children }: PropsWithChildren) => {
  return <NavbarLayout>{children}</NavbarLayout>;
};

export default Layout;
