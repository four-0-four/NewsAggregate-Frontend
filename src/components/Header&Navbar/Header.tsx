import React, { useState } from 'react';
import { selectIsAuthenticated, selectUserDetails } from '../../lib/features/user/slice';
import { useAppSelector } from '../../lib/hooks';
import ProfileDropdown from '../ProfileDropdown';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../Buttons/PrimaryButton';

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const today = new Date();
  const navigate = useNavigate();
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
          <button className={`${isAuthenticated?'lg:hidden':'hidden'}`} onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <p className="hidden lg:flex ml-3 py-2 px-3 rounded-[20px] text-md text-neutral-300">{longFormattedDate}</p>
          <p className="hidden md:flex lg:hidden ml-3 py-2 px-3 rounded-[20px] text-md text-neutral-300">{shortFormattedDate}</p>
        </div>
  
        {/* Logo - Center on large screens, left on smaller screens */}
        <div className='flex md:justify-center items-center flex-grow md:flex-grow-0 cursor-pointer' onClick={()=>navigate('/')}>
          <img src={'/logo_transparent.png'} alt="Farabix" className="w-12" />
          <p className="hidden xs:flex text-lg xs:text-xl md:text-2xl text-primary uppercase">Farabix</p>
        </div>
  
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