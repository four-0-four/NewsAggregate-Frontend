// components/BottomNavbar.tsx

import InterestsModal from '@/components/InterestsModal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const BottomNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const selected = true;
    const selected2 = false;
    let interests: string[] = [];
    const router = useRouter();
    

    const isActive = (path) => {
        return router.pathname === path;
    };

    const handleYourInterestsClick = () => {
        setShowModal(true);
    };
    
    return (
        <>
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black text-white min-h-[50px] flex items-center">
                <ul className="flex justify-evenly w-full">
                    <Link href="/" className={`flex items-center text-xs sm:text-md p-1 px-2 sm:p-2 sm:px-3 text-center rounded-[25px] ${isActive('/') ? 'bg-neutral-700 text-neutral-300' : 'text-neutral-300'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden w-5 h-5 sm:inline-block mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                        </svg>

                        News For You
                    </Link>
                    <Link href="/explore" className={`flex items-center text-xs sm:text-md p-1 px-2 sm:p-2 sm:px-3 text-center rounded-[25px]  ${isActive('/explore') ? 'bg-neutral-700 text-neutral-300' : 'text-neutral-300'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden w-5 h-5 sm:inline-block mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                        </svg>
                        Explore Topics
                    </Link>
                    <li 
                        className={`flex items-center text-xs sm:text-md p-1 px-2 sm:p-2 sm:px-3 text-center text-neutral-300`} 
                        onClick={handleYourInterestsClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden w-5 h-5 sm:inline-block mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        Your Interests
                    </li>
                </ul>
            </nav>

            {showModal && <InterestsModal onClose={() => setShowModal(false)} interests={interests}/>}
        </>
    );
};

export default BottomNavbar;
