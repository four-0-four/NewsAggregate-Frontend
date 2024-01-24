import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="">
            <h1 className="font-bold text-2xl md:text-3xl my-8 md:my-12">Privacy Policy</h1>
            
            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">1. Introduction</h2>
            <p className='text-sm md:text-base my-2 md:my-4'>Your privacy is important to us. This policy outlines our data handling practices.</p>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">2. Information Collection</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Types of Data</strong>: We collect personal and usage data.</p>
                <p><strong>Collection Methods</strong>: Data is collected directly from users and through third-party sources.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">3. Use of Information</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Purpose</strong>: Collected data is used for service improvement and communication.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">4. Sharing and Disclosure</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Data Sharing</strong>: Information may be shared under legal obligations or during business transfers.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">5. Data Security</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Protection Measures</strong>: We implement measures to protect user data.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">6. User Rights</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Data Rights</strong>: Users have rights to access, rectify, or delete their data.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">7. International Transfers</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Cross-Border Data</strong>: Information about international data transfers is provided.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">8. Changes to the Privacy Policy</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Policy Changes</strong>: We reserve the right to modify this policy and will notify users.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">9. Contact Information</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p>For queries or concerns, please contact us</p>
            </div>
        </div>
    );
};

import nookies from "nookies";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check authentication (e.g., check cookies or token)
  const cookies = nookies.get(context);
  const token = cookies['access_token'];
  const refresh_token = cookies['refresh_token'];
  if (!token || !refresh_token) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default PrivacyPolicy;