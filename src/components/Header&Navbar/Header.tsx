import React, { useState } from 'react';
import { selectIsAuthenticated, selectUserDetails } from '../../lib/features/user/slice';
import { useAppSelector } from '../../lib/hooks';
import ProfileDropdown from '../ProfileDropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CustomStyles.module.scss';
import isTokenValid from '../../../src/util/token';
import Cookies from 'js-cookie';

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const today = new Date();
  const navigate = useNavigate();
  const location = useLocation();
  const areWeOnLandingPage = location.pathname.includes('/landing');
  const isLandingPage = location.pathname === '/landing';
  const isContactRoute = location.pathname.includes('/landing/contactUs');
  const isNewsSourcesRoute = location.pathname.includes('/landing/newsSources');
  // Long format for large screens
  const longFormattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Short format for medium screens
  const shortFormattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  const accessToken = Cookies.get('access_token');
  const isAuthenticated = accessToken && isTokenValid(accessToken)
  let userDetails = useAppSelector(selectUserDetails)

  if (!userDetails) {
    const userDetailsFromStorage = localStorage.getItem("userDetails");

    // Parse the JSON string from cookies. If it's not present or parsing fails, default to an empty array
    try {
      userDetails = userDetailsFromStorage ? JSON.parse(userDetailsFromStorage) : [];
    } catch (error) {
      userDetails = null;
    }
  }

  return (
    <header className="bg-black text-white p-2 px-4 fixed top-0 left-0 right-0 z-30 mb-10">
      <div className="max-w-[1200px] mx-auto px-0 xs:px-6 flex items-center justify-between">
        {/* Burger Icon and Date - Always on the left */}
        <div className="flex items-center">
          <button className={`${isAuthenticated?'lg:hidden':'lg:hidden'}`} onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <a className='flex md:justify-center items-center flex-grow md:flex-grow-0 cursor-pointer ml-3' href="/">
            <img src={'/logo_transparent.png'} alt="Farabix" className="w-12" />
            <p className="hidden xs:flex text-xl xs:text-2xl text-primary uppercase">Farabix</p>
          </a>
        </div>
  
        {/* Logo - Center on large screens, left on smaller screens */}
        {areWeOnLandingPage && (
          <div className=' hidden lg:flex flex-row md:gap-4 lg:gap-4 xl:gap-6'>
            {isAuthenticated && (
              <a href="/">
                Home
              </a>  
            )}
            <a href="/landing" className={`${isLandingPage?styles.headerunderlined:''}`}>Landing</a>
            <a href="/landing/contactUs" className={`${isContactRoute?styles.headerunderlined:''}`}>Contact Us</a>
            <a href="/landing/newsSources" className={`${isNewsSourcesRoute?styles.headerunderlined:''}`}>News Sources</a>
          </div>
        )}
  
        {/* Profile/Login - Always on the right */}
        <div className="flex justify-end">
          {isAuthenticated && userDetails ? (
            <ProfileDropdown firstName={userDetails.first_name} lastName={userDetails.last_name} username={userDetails.username}/>
          ) : (
            <a href='/auth/Login' className='text-md md:text-lg px-6 md:px-12 py-1 text-black rounded-full capitalize bg-primary hover:bg-opacity-80'>
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 