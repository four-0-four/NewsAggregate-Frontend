import React from 'react';
import { useAppSelector } from '../../lib/hooks';
import { selectUserStatus } from '../../lib/features/user/slice';
import ContactUsForm from '../../components/Forms/ContactUsForm';
import SocialMedia from '../../components/SocialMedia';
import Box from '../../components/Box/Box';

const ContactUs = () => {
    const status = useAppSelector(selectUserStatus);
    
    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-y-4">
          <Box title="Let&apos;s Chat, Reach Out to Us">
            <p className={`text-sm sm:text-md text-neutral-500 ${(status === 'succeeded' || status === 'failed') ? "mb-1" : "mb-4"}`}>Have a question or feedback? We&apos;re here to help. Send us a message, and we&apos;ll respond within 24 hours</p>
            <ContactUsForm />
          </Box>
          <Box title="Other Ways to Reach Us">
            <SocialMedia />
          </Box>
        </div>
    );
}

export default ContactUs;
