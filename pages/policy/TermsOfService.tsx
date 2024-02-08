import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="">
            <h1 className="font-bold text-2xl md:text-3xl my-8 md:my-12">Terms of Service</h1>
            
            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">1. Introduction</h2>
            <p className='text-sm md:text-base my-2 md:my-4'>Welcome to Farabix. By using our website, you agree to these <strong>Terms of Service</strong>. Our platform features news aggregated from other news sources like <strong>BBC, PBS, Reuters</strong>, etc., and allows freelance journalists to post their news content directly as well.</p>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">2. User Accounts</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Account Creation</strong>: Users must provide accurate information when creating an account.</p>
                <p><strong>Account Responsibility</strong>: Users are responsible for their account security and activity.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">3. Content Posting and Usage</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Content Guidelines</strong>: Users can post news content, adhering to ethical journalism standards.</p>
                <p><strong>Intellectual Property</strong>: Respect for intellectual property rights is mandatory. Proper attribution to sources like <strong>BBC, PBS, Reuters</strong>, etc., is required.</p>
                <p><strong>Prohibited Content</strong>: False information, defamation, and illegal activities are prohibited.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">4. Content Moderation</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Moderation Rights</strong>: We reserve the right to remove or modify content that violates these Terms.</p>
                <p><strong>Appeals</strong>: Users can appeal moderation decisions through designated channels.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">5. Third-Party Links and Services</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Third-Party Content</strong>: Our platform may contain links to third-party websites. We are not responsible for their content or practices.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">6. Liability and Disclaimer</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Limitation of Liability</strong>: The platform is not liable for damages arising from the use of the service.</p>
                <p><strong>No Warranty</strong>: There is no warranty on the accuracy or completeness of the information provided.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">7. Changes to the Terms</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Modification of Terms</strong>: We may modify these Terms and will notify users of changes.</p>
                <p><strong>Acceptance of Changes</strong>: Continued use of the platform signifies acceptance of new Terms.</p>
            </div>

            <h2 className="font-bold text-xl md:text-2xl my-3 md:my-4">8. Governing Law</h2>
            <div className='text-sm md:text-base my-2 md:my-4'>
                <p><strong>Jurisdiction</strong>: These Terms are governed by the laws of Ontario, Canada, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Ontario.</p>
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

export default TermsOfService;