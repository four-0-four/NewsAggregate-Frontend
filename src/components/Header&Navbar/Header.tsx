import React, { useState } from 'react';
import { selectIsAuthenticated, selectUserDetails } from '../../lib/features/user/slice';
import { useAppSelector } from '../../lib/hooks';
import ProfileDropdown from '../ProfileDropdown';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const today = new Date();
  const navigate = useNavigate();
  const formattedDate = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const shortFormattedDate = today.toLocaleDateString('en-US', options);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userDetails = useAppSelector(selectUserDetails)

  return (
    <header className="bg-black text-white p-2 px-4 fixed top-0 left-0 right-0 z-10 mb-10">
      <div className="max-w-[1450px] mx-auto flex justify-between items-center">
        <div className="flex items-center sm:ml-2 md:ml-6 ">
          <button className='block lg:hidden' onClick={toggleSidebar} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7 inline-block mr-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <p className="block ml-3 lg:ml-0 bg-neutral-800 border border-neutral-600 py-2 px-3 sm:py-2 rounded-[20px] text-sm sm:text-md text-neutral-300">{shortFormattedDate}</p>
        </div>
        <div className='cursor-pointer flex flex-row items-center' onClick={()=>navigate('/')}>
          <img src={'/logo_transparent.png'} alt="Farabix" className="w-12" />
          <p className="hidden sm:block md:ml-2 text-2xl sm:text-3xl text-primary uppercase">Farabix</p>
        </div>

        {/* Conditional renderingbased on user status */}
        {isAuthenticated && userDetails ? (
          <>
            <ProfileDropdown firstName={userDetails.first_name} lastName={userDetails.last_name} username={userDetails.username}/>
          </>
        ) : (
          <button className="bg-primary text-black py-2 px-3 sm:px-8 rounded-[20px] uppercase text-sm sm:text-md" onClick={()=>navigate('/auth/Login')}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header; 