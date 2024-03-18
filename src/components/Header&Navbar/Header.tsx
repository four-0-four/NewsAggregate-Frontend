import React, { useState } from 'react';
import { selectIsAuthenticated, selectUserDetails } from '../../lib/features/user/slice';
import { useAppSelector } from '../../lib/hooks';
import ProfileDropdown from '../ProfileDropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../Buttons/PrimaryButton';

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const today = new Date();
  const navigate = useNavigate();
  const location = useLocation();
  const areWeOnLandingPage = location.pathname.includes('/landing');
  const isLandingPage = location.pathname === '/landing';
  const isContactRoute = location.pathname.includes('/landing/contactUs');
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

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userDetails = useAppSelector(selectUserDetails)

  return (
    <header className="bg-black text-white p-2 px-4 fixed top-0 left-0 right-0 z-10 mb-10">
      <div className="max-w-[1200px] mx-auto px-0 xs:px-6 flex items-center justify-between">
        {/* Burger Icon and Date - Always on the left */}
        <div className="flex items-center">
          <button className={`${isAuthenticated?'lg:hidden':'lg:hidden'}`} onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className='flex md:justify-center items-center flex-grow md:flex-grow-0 cursor-pointer ml-3' onClick={()=>navigate('/')}>
            <img src={'/logo_transparent.png'} alt="Farabix" className="w-12" />
            <p className="hidden xs:flex text-xl xs:text-2xl md:text-3xl text-primary">Farabix</p>
          </div>
        </div>
  
        {/* Logo - Center on large screens, left on smaller screens */}
        {areWeOnLandingPage && (
          <div className=' hidden lg:flex flex-row md:gap-4 lg:gap-6 xl:gap-8'>
            {isAuthenticated && (
              <a href="/">
                Home
              </a>  
            )}
            <a href="/landing" className={`${isLandingPage?'text-primary border-b border-primary':''}`}>Landing</a>
            <a href="/landing/contactUs" className={`${isContactRoute?'text-primary border-b border-primary':''}`}>Contact Us</a>
            <a href="/landing/newsSources">News Sources</a>
          </div>
        )}
  
        {/* Profile/Login - Always on the right */}
        <div className="flex justify-end">
          {isAuthenticated && userDetails ? (
            <ProfileDropdown firstName={userDetails.first_name} lastName={userDetails.last_name} username={userDetails.username}/>
          ) : (
            <a href='/auth/Login' className='text-md md:text-lg px-6 md:px-12 py-1 text-black rounded-[8px] capitalize bg-primary hover:bg-opacity-80'>
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 