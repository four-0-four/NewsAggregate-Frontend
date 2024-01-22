// components/Layout.tsx

import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNavbar from './BottomNavbar';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/lib/features/user/slice';
import { RootState } from '@/lib/store';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  return (
    <>
      <Header />
      <div className="flex max-w-[1450px] mx-auto pt-[60px]">
        {isAuthenticated && (<Sidebar />)}
        <main className={`flex-1 p-2 px-1 sm:px-2 justify-start pt-5`}>
          {children}
        </main>
      </div>
      {isAuthenticated && (<BottomNavbar />)}
    </>
  );
};

export default Layout;
