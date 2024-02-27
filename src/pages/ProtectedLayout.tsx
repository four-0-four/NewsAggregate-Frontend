import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { fetchUserDetails, refreshAccessToken } from '../lib/features/user/thunks';
import Cookies from 'js-cookie';
import isTokenValid from '../util/token';

const ProtectedLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get('token');
      if (!isAuthenticated && token) {
        if (isTokenValid(token)) {
          // Attempt to refresh access token or fetch user details if needed
          await dispatch(refreshAccessToken());
          // You may need to fetch user details here as well depending on your auth flow
          await dispatch(fetchUserDetails());
        } else {
          // Token is not valid, redirect to landing page
          navigate('/landing', { replace: true });
        }
      } else if (!isAuthenticated && !token) {
        // No token found, redirect to landing page
        navigate('/landing', { replace: true });
      }
    };

    checkAuthentication();
  }, [dispatch, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    // If not authenticated, nothing will be rendered, and useEffect will handle redirection.
    return null;
  }

  // Render layout components along with protected route's content
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
