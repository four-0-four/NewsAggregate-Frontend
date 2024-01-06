// components/Layout.tsx

import React, { ReactNode } from 'react';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-[1450px] mx-auto  p-2 px-4 sm:px-12">
        {children}
      </main>
    </>
  );
};

export default Layout;
