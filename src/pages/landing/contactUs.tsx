import React from 'react';
import { useAppSelector } from '../../lib/hooks';
import { selectUserStatus } from '../../lib/features/user/slice';
import ContactUsForm from '../../components/Forms/ContactUsForm';
import SocialMedia from '../../components/SocialMedia';
import Box from '../../components/Box/Box';
import Footer from './Footer';

const ContactUsLanding = () => {
    const status = useAppSelector(selectUserStatus);
    
    return (
        <div className='w-full'>
            <div className='flex w-full justify-center items-center min-h-screen mx-auto px-0 xs:px-6 pt-[90px]'>
                <div className="flex flex-col justify-center items-center gap-y-4">
                    <Box title="Let's Chat, Reach Out to Us">
                        <p className={`text-sm sm:text-md text-neutral-500 ${(status === 'succeeded' || status === 'failed') ? "mb-1" : "mb-4"}`}>Have a question or feedback? We're here to help. Send us a message, and we'll respond within 24 hours</p>
                        <ContactUsForm />
                    </Box>
                    <Box title="Other Ways to Reach Us">
                        <SocialMedia />
                    </Box>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContactUsLanding;
