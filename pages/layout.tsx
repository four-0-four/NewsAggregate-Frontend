import React, { ReactNode } from 'react';
import Header from '../components/Header&Navbar/Header';
import Sidebar from '../components/Sidebar/MainSidebar';
import ProfileSidebar from '../components/Sidebar/ProfileSidebar'; // Import ProfileSidebar
import BottomNavbar from '../components/Header&Navbar/BottomNavbar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../lib/store';
import { selectIsAuthenticated } from '../lib/features/user/slice';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const router = useRouter();
  
  // Check if current route is /landing
  const isLandingPage = router.pathname === '/landing';
  const isProfileRoute = router.pathname.includes('/profile');

  return (
    <>
      <Header />
      <div className={`${isLandingPage ? '' : 'flex max-w-[1450px] mx-auto pt-[60px] '}`}>
        {!isLandingPage && isAuthenticated && (
          // Show ProfileSidebar if the route includes /profile, otherwise show the normal Sidebar
          isProfileRoute ? <ProfileSidebar /> : <Sidebar />
        )}
        <main className={`${isLandingPage ? '' : 'flex-1 p-2 px-1 sm:px-2 justify-start pt-5'}`}>
          {children}
        </main>
      </div>
      {!isLandingPage && isAuthenticated && (<BottomNavbar />)}
    </>
  );
};

export default Layout;