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
  //const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  let isAuthenticated = true;
  return (
    <>
      <Header />
      <div className="flex max-w-[1450px] mx-auto min-h-[700px] h-[92vh] p-2 py-8">
        {isAuthenticated && (<Sidebar />)}
        <main className="flex-1 px-4 sm:px-12">
          {children}
        </main>
      </div>
      {isAuthenticated && (<BottomNavbar />)}
    </>
  );
};

export default Layout;
