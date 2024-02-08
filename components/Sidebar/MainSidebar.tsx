// components/Sidebar.tsx

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { use, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated } from '../../lib/features/user/slice';
import { RootState, wrapper } from '../../lib/store';
import Interests from '../Interests';
import { fetchUserFollowings } from '../../lib/features/user/thunks';
import Sidebar from './Sidebar';
import SidebarElement from './SidebarElement';

const MainSidebar = () => {
    let interests: string[] = [];
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    let userFollowings = useSelector((state: RootState) => state.user.followings);
    if (userFollowings === undefined){
        userFollowings = [];
    }
    useEffect(() => {
        dispatch(fetchUserFollowings());
    }, [isAuthenticated]);
    

    const isActive = (path:any) => {
        return router.pathname === path;
    };


    return (
        <Sidebar title="Main Menu">
            <div>
                <nav className='mb-4'>
                    <ul>
                        <SidebarElement href="/" icon={<FeedIcon />}>
                            News For You
                        </SidebarElement>  
                        <SidebarElement href="/topics" icon={<TopicIcon />}>
                            Explore Topics
                        </SidebarElement> 
                    </ul>
                </nav>
                <div className='px-3 xl:px-4'>
                    <Interests interests={userFollowings} />
                </div>
            </div>
            <nav className="absolute bottom-0 left-0 right-0 py-2 mx-2 border-t border-neutral-100">
                <ul className="flex w-full">
                    <Link href="/TermsOfService" className="flex-1 text-center text-neutral-200 cursor-pointer hover:underline text-xs xl:text-sm border-r border-neutral-100">
                        Terms of Service
                    </Link>
                    <Link href="/PrivacyPolicy" className="flex-1 text-center text-neutral-200 cursor-pointer hover:underline text-xs xl:text-sm">
                        Privacy Policy
                    </Link>
                </ul>
            </nav>
        </Sidebar>
    );
};

const FeedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block mr-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
    </svg>
)

const TopicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block mr-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
    </svg>
)

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    // Dispatch your Redux action. Assuming fetchUserFollowings returns a Promise.
    await store.dispatch(fetchUserFollowings());

    return {
        props: {}, // You can pass any props to the component here.
    };
});

export default MainSidebar;
