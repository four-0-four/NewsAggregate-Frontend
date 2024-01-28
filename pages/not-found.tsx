import React from 'react';
import Layout from '../app/Layout';

const notFound = () => {
  return (
    <Layout>
      <div className='flex flex-col items-center'>
          <img src={"/404.png"} className='max-w-[90%] sm:max-w-[70%] md:max-w-[50%]'/>
          <h1 className='max-w-[500px] xs:px-10 px-2'>
              Oops! The page you are looking for does not exists. if you think this is a mistake please report this to us with a screenshot as soon as possible so we can fix it
          </h1>
      </div>
    </Layout>
  );
}

export default notFound;