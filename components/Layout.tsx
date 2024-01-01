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
      <main className="max-w-[1450px] mx-auto">
        {children}
      </main>
    </>
  );
};

export default Layout;
