import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Box from '../../components/Box/Box'
import { addFollowing, addFollowings, removeFollowing } from '../../lib/features/user/thunks';
import { useAppDispatch } from '../../lib/hooks';
import CategoryIcons from '../../util/CategoryIcons';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { addFollowingsStatus } from '../../lib/features/user/slice';
import { fetchNewsArticles } from '../../lib/features/news/thunks';

type HomeInterestsProps = {
    userFollowings: (string)[];
    categories: (string | undefined)[];
    firstName?: string;
    start: () => void;
  };
  
  const HomeInterests: React.FC<HomeInterestsProps> = ({ categories, firstName, start}) => {
    const dispatch = useAppDispatch();
    let tagDesign = "text-sm sm:text-md inline-block mr-2 mb-2 sm:mr-3 sm:mb-3 px-4 py-2 capitalize border border-primary rounded-[20px] transition-colors duration-300 hover:bg-primary hover:text-black";
    let interestDesign = "text-sm sm:text-md inline-block mr-3 mb-3 px-4 py-2 capitalize bg-primary border border-primary rounded-[20px] transition-colors duration-300 hover:bg-opacity-80";

    const [userFollowings, setUserFollowings] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    let MIN_INTEREST_NEWS = 2
    const [buttonText, setButtonText] = useState(`Add ${MIN_INTEREST_NEWS} More Interests`);

    useEffect(() => {
        // Load user followings from cookies
        const followingsFromStorage = localStorage.getItem('userFollowings');
        if (followingsFromStorage) {
            setUserFollowings(JSON.parse(followingsFromStorage));
        }
    }, []);

    const updateCookieFollowings = (newFollowings: string[]) => {
        // Update the cookie with new user followings
        localStorage.setItem('userFollowings', JSON.stringify(newFollowings));
        setUserFollowings(newFollowings);
    };

    let handleRemoveInterest = (topic: string) => {
        if (!userFollowings.includes(topic)) return;
        const newFollowings = userFollowings.filter(following => following !== topic);
        setButtonText(`Add ${MIN_INTEREST_NEWS - newFollowings.length} More Interests`);
        updateCookieFollowings(newFollowings);
    };

    let handleAddInterest = (topic: string) => {
        if (userFollowings.includes(topic)) return;
        const newFollowings = [...userFollowings, topic];
        setButtonText(`Add ${MIN_INTEREST_NEWS - newFollowings.length} More Interests`);
        updateCookieFollowings(newFollowings);
    };

    let handleSubmit = () => {
        setLoading(true);
        if (userFollowings.length < 2) return;
        dispatch(addFollowingsStatus(userFollowings));
        dispatch(addFollowings({ topics: userFollowings })).unwrap().then(() => {
            start();
            setLoading(false);
        });
    }

    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-y-4">
            <Box title={`Welcome, ${firstName}!`}>
                {(loading) && (
                    <div className="z-10 w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-70">
                        <img src="/gettingStarted.gif" className='w-[50px]'/>
                        <p className='text-primary text-lg mt-1'>Getting Started...</p>
                    </div>
                )}
                <div className='relative'>
                    <p className='mb-5 text-sm sm:text-md'>To tailor your Farabix experience, please select the interests from below. Choose a minimum of 2!</p>
                    <h1 className='text-lg sm:text-xl font-bold text-left capitalize font-semibold flex items-center mb-3'>Add Interests</h1>
                    <p className='text-sm text-gray-300 mt-[-15px] pb-4 mb-1'>(Min {MIN_INTEREST_NEWS} Interest)</p>
                    <div className='flex flex-wrap'>
                        {categories.map((category, index) => 
                            ((!category || userFollowings.includes(category))?(
                                <div className='relative'>
                                    <p className={`${interestDesign}`}>
                                        {category ? CategoryIcons(category) : ""}{category}
                                    </p>
                                    {category ? (
                                        <button onClick={()=>handleRemoveInterest(category)} className={`absolute top-[-0.5rem] right-1 text-sm rounded-full bg-black text-white h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    ):("")}
                                </div>
                            ):(
                                <button onClick={()=>category?handleAddInterest(category):""} className={tagDesign}>{category?CategoryIcons(category):""}{category}</button>
                            )
                            )
                        )}
                    </div>
                    <div className='flex justify-end mt-5'>
                        <PrimaryButton text={userFollowings.length >= MIN_INTEREST_NEWS?'Get Started':buttonText} onClick={handleSubmit} disabled={userFollowings.length<2}/>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default HomeInterests