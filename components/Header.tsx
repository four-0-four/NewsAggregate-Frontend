// components/Header.tsx

import React from 'react';

const Header: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const options = { month: 'short', day: 'numeric' };
  const shortFormattedDate = today.toLocaleDateString('en-US', options);

  return (
    <header className="bg-black text-white p-2 px-4 sm:px-12">
      <div className="max-w-[1450px] mx-auto flex justify-between items-center">
        <span className="hidden sm:block ml-2 text-md sm:text-lg">{formattedDate}</span>
        <div className="flex items-center">
          <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/logo_transparent.png" alt="Farabix" className="w-12" />
          <p className="hidden sm:block ml-2 text-xl sm:text-2xl text-primary uppercase">Farabix</p>
          <span className="block sm:hidden text-xl ml-2">{shortFormattedDate}</span>
        </div>
        <button className="bg-primary text-black py-2 px-4 sm:px-8 rounded-[25px] uppercase text-sm sm:text-md">Register</button>
      </div>
    </header>
  );
};

export default Header;
