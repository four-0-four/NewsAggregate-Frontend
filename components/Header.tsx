// components/Header.tsx

import React from 'react';

const Header: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="bg-black text-white p-2">
      <div className="max-w-[1450px] mx-auto flex justify-between items-center">
        <span>{formattedDate}</span>
        <div className="logo flex items-center">
          <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/logo_transparent.png" alt="Farabix" className="w-12" />
          <p className="ml-2 text-2xl text-primary uppercase">Farabix</p>
        </div>
        <button className="bg-primary text-black py-2 px-8 px-4 rounded-[25px] uppercase">Register</button>
      </div>
    </header>
  );
};

export default Header;
