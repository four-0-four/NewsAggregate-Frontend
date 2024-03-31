// Sidebar.tsx or Sidebar.jsxMobileSidebarLanding
import React, { ReactNode } from 'react';
import SidebarElement from './SidebarElement';
import ProfileSidebarSection from './ProfileSidebarSection';
import ContactSidebarSection from './ContactSidebarSection';
import InterestSidebarSection from './InterestSidebarSection';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../lib/features/user/slice';
import { RootState } from '../../lib/store';
import { useLocation } from 'react-router-dom';

type SidebarProps = {
};

const MobileSidebarLanding: React.FC<SidebarProps> = () => {
    const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
    
    return (
        <aside className="flex lg:flex-col w-full bg-white py-5 h-full px-5 pt-8">
            <div className='w-full'>
                <h1 className='text-lg font-bold my-2 mt-0 px-2'>
                    Main Menu
                </h1>
                <nav className='mb-4'>
                    <ul>
                        {isAuthenticated && (
                            <SidebarElement href="/" icon={<FeedIcon />}>
                                Home
                            </SidebarElement>
                        )}  
                        <SidebarElement href="/landing" icon={<LandingIcon />}>
                            Landing
                        </SidebarElement>
                        <SidebarElement href="/landing/contactUs" icon={<ContactUsIcon />}>
                            Contact Us
                        </SidebarElement>
                        <SidebarElement href="/landing/newsSources" icon={<NewsSourceIcon />}>
                            News Sources
                        </SidebarElement>  
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

const FeedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 inline-block mr-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
)

const LandingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 inline-block mr-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
)

const ContactUsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 inline-block mr-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
)

const NewsSourceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 inline-block mr-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
    </svg>
)

export default MobileSidebarLanding;
