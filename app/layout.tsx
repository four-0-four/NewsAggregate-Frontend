import React, { ReactNode } from 'react';
import Header from '../pages/Header';
import Sidebar from './Sidebar';
import BottomNavbar from '../pages/BottomNavbar';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/lib/features/user/slice';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const router = useRouter();
  
  // Check if current route is /landing
  const isLandingPage = router.pathname === '/landing';

  return (
    <>
      <Header />
      <div className={`${isLandingPage ? '' : 'flex max-w-[1450px] mx-auto pt-[60px] '}`}>
        {!isLandingPage && isAuthenticated && (<Sidebar />)}
        <main className={`${isLandingPage ? '' : 'flex-1 p-2 px-1 sm:px-2 justify-start pt-5 '}`}>
          {children}
        </main>
      </div>
      {!isLandingPage && isAuthenticated && (<BottomNavbar />)}
    </>
  );
};

export default Layout;