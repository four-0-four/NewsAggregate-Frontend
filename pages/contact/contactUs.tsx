import React from 'react';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { useAppSelector } from '../../lib/hooks';
import { selectUserStatus } from '../../lib/features/user/slice';
import ContactUsForm from '../../components/Forms/ContactUsForm';
import SocialMedia from '../../components/SocialMedia';

const ContactUs = () => {
    const status = useAppSelector(selectUserStatus);
    
    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start">
            <div className="w-full px-4 sm:w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl bg-white p-6 rounded-[20px] border border-gray-100 ">
                <h1 className={`text-lg sm:text-xl md:text-2xl font-bold text-left uppercase pb-4 font-semibold`}>
                  Let&apos;s Chat, Reach Out to Us
                </h1>
                <p className={`text-sm sm:text-md border-b border-gray-100 text-neutral-500 pb-4 ${(status === 'succeeded' || status === 'failed') ? "mb-1" : "mb-4"}`}>Have a question or feedback? We&apos;re here to help. Send us a message, and we&apos;ll respond within 24 hours</p>
                <ContactUsForm />
            </div>
            <SocialMedia />
        </div>
    );
}

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

export default ContactUs;
