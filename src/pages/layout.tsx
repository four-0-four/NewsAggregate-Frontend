import React, { ReactNode, useEffect, useState } from 'react';
import Header from '../components/Header&Navbar/Header';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation instead of useRouter
import Sidebar from '../components/Sidebar/Sidebar';
import MobileSidebar from '../components/Sidebar/MobileSidebar';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { resetStatus, selectIsAuthenticated, selectUserFollowings, setAuthenticationState } from '../lib/features/user/slice';
import Cookies from 'js-cookie';
import isTokenValid from '../util/token';
import { fetchUserDetails, refreshAccessToken } from '../lib/features/user/thunks';
import { healthCheck } from '../lib/features/news/thunks';
import MobileSidebarLanding from '../components/Sidebar/MobileSidebarLanding';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  let userFollowings = useAppSelector(selectUserFollowings);
  const location = useLocation(); // Use useLocation to access the current route
  // Check if current route is /landing, /profile, or /contact
  const navigate = useNavigate();
  const isLandingPage = location.pathname.includes('/landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    dispatch(resetStatus());
  }, [location.pathname, dispatch]); 

  const [isLoading, setIsLoading] = useState(true);

  const kickUserOut = async () => {
    Cookies.remove('access_token');
    await dispatch(setAuthenticationState(false));
    setIsLoading(false);
  }

  const checkAuth = async () => {
    const accessToken = Cookies.get('access_token');
    if (accessToken && isTokenValid(accessToken)) {
      await dispatch(setAuthenticationState(true));
      await dispatch(fetchUserDetails());
      setIsLoading(false);
      return true
    } else {
      await kickUserOut();
      return false
    }
  };

  const isUserStillAuthenticated = async () => {
    const accessToken = Cookies.get('access_token');
    return (accessToken && isTokenValid(accessToken));
  }


  useEffect(() => {
    dispatch(healthCheck())
    checkAuth();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAuthenticated) {
      interval = setInterval(() => {
        dispatch(refreshAccessToken());
      }, 10 * 60 * 1000); // Refresh token every 15 minutes
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAuthenticated]);


  useEffect(() => {
    const handleVisibilityChange = async () => {
      let authenticationStatus = await isUserStillAuthenticated();
      if (document.visibilityState === 'visible' && authenticationStatus && isAuthenticated) {
        dispatch(refreshAccessToken());
      }else if(document.visibilityState === 'visible' && !authenticationStatus && isAuthenticated){
        navigate('/landing'); 
        await kickUserOut();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading component
  }

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={toggleSidebar}></div>
      )}
      <div className={`${isLandingPage ? '' : 'flex max-w-[1200px] mx-auto px-0 xs:px-6  pt-[60px] '}`}>
        {isAuthenticated && !isLandingPage && (
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
        )}
        {isLandingPage && (
          <div className={`fixed lg:hidden inset-y-0 left-0 z-30 w-64 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform ease-in-out duration-300 lg:translate-x-0 lg:static lg:z-auto bg-white shadow-lg`}>
            {/* Close button for sidebar */}
            <button onClick={toggleSidebar} className="absolute top-0 right-0 p-4 lg:hidden">
              {/* SVG for cross icon */}
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <MobileSidebarLanding />
          </div>
        )}
        {isAuthenticated && !isLandingPage && (<Sidebar />)}
        <main className={`${isLandingPage ? '' : 'flex-1 p-2 px-1 sm:px-2 justify-start pt-5'} ${isAuthenticated?'':'flex justify-center'}`}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;