import React, { ReactNode, useEffect, useState } from 'react';
import Header from '../components/Header&Navbar/Header';
import { useLocation } from 'react-router-dom'; // Import useLocation instead of useRouter
import Sidebar from '../components/Sidebar/Sidebar';
import MobileSidebar from '../components/Sidebar/MobileSidebar';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { resetStatus, selectIsAuthenticated } from '../lib/features/user/slice';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation(); // Use useLocation to access the current route
  // Check if current route is /landing, /profile, or /contact
  const isLandingPage = location.pathname === '/landing';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  useEffect(() => {
    dispatch(resetStatus());
  }, [location.pathname, dispatch]); 

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={toggleSidebar}></div>
      )}
      <div className={`${isLandingPage ? '' : 'flex max-w-[1450px] mx-auto pt-[60px] '}`}>
        <div className={`fixed lg:hidden inset-y-0 left-0 z-30 w-64 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform ease-in-out duration-300 lg:translate-x-0 lg:static lg:z-auto bg-white shadow-lg`}>
          {/* Close button for sidebar */}
          <button onClick={toggleSidebar} className="absolute top-0 right-0 p-4 lg:hidden">
            {/* SVG for cross icon */}
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <MobileSidebar />
        </div>
        {isAuthenticated && !isLandingPage && (<Sidebar />)}
        <main className={`${isLandingPage ? '' : 'flex-1 p-2 px-1 sm:px-2 justify-start pt-5'}`}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;