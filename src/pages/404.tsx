import React from 'react';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center items-center'>
      <img src={"/404.png"} className='max-w-[10%] sm:max-w-[50%] md:max-w-[30%]'/>
      <h1 className='max-w-[500px] text-center'>
          Oops! The page you are looking for does not exists. if you think this is a mistake please report this to us with a screenshot as soon as possible so we can fix it
      </h1>
    </div>
  );
}

export default NotFound;