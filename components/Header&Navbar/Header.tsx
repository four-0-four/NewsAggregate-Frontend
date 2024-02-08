import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../lib/store'; // Adjust the path according to your file structure
import { selectIsAuthenticated, selectUserDetails } from '../../lib/features/user/slice';
import { useAppSelector } from '../../lib/hooks';
import ProfileDropdown from '../ProfileDropdown';

const Header: React.FC = () => {
  const today = new Date();
  const router = useRouter();
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
        <div className="flex items-center">
          <p className="block sm:ml-2 md:ml-6 bg-neutral-800 border border-neutral-600 py-2 px-3 sm:py-2 rounded-full text-sm sm:text-md text-neutral-300">{shortFormattedDate}</p>
        </div>
        <div className='cursor-pointer flex flex-row items-center' onClick={()=>router.push('/')}>
          <img src={'/logo_transparent.png'} alt="Farabix" className="w-12" />
          <p className="hidden sm:block md:ml-2 text-2xl sm:text-3xl text-primary uppercase">Farabix</p>
        </div>

        {/* Conditional rendering based on user status */}
        {isAuthenticated && userDetails ? (
          <>
            <ProfileDropdown firstName={userDetails.first_name} lastName={userDetails.last_name} username={userDetails.username}/>
          </>
        ) : (
          <button className="bg-primary text-black py-2 px-3 sm:px-8 rounded-[20px] uppercase text-sm sm:text-md" onClick={()=>router.push('/auth/Login')}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;