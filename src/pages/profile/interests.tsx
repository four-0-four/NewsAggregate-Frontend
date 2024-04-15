import Box from '../../components/Box/Box'
import { selectNewsCategories } from '../../lib/features/news/slice';
import { fetchCategories } from '../../lib/features/news/thunks';
import { selectIsAuthenticated, selectUserFollowings } from '../../lib/features/user/slice';
import { addFollowing, fetchUserFollowings, removeFollowing } from '../../lib/features/user/thunks';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { RootState } from '../../lib/store';
import CategoryIcons from '../../util/CategoryIcons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

type Props = {}

const Interests = (props: Props) => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const categories = useAppSelector(selectNewsCategories);
    const [userFollowings, setUserFollowings] = useState<string[]>(useAppSelector(selectUserFollowings));
    let tagDesign = "text-sm sm:text-md inline-block mr-2 mb-2 sm:mr-3 sm:mb-3 px-4 py-2 capitalize border border-primary rounded-[20px] transition-colors duration-300 hover:bg-primary hover:text-black";
    let interestDesign = "text-sm sm:text-md inline-block mr-3 mb-3 px-4 py-2 capitalize bg-primary border border-primary rounded-[20px] transition-colors duration-300 hover:bg-opacity-80";
    
    // load userFollowings from local storage
    useEffect(() => {
        if (!userFollowings || userFollowings.length === 0) {
            const userFollowingsFromStorage = localStorage.getItem("userFollowings");
    
            // Parse the JSON string from cookies. If it's not present or parsing fails, default to an empty array
            try {
                setUserFollowings(userFollowingsFromStorage ? JSON.parse(userFollowingsFromStorage) : [])
            } catch (error) {
                setUserFollowings([]);
            }
        }
    }, []);
    

    useEffect(() => {
        if (isAuthenticated) {
          dispatch(fetchCategories({parent_category_id:0}))
          dispatch(fetchUserFollowings());
        }
    }, [dispatch, isAuthenticated]);

    const updateCookieFollowings = (newFollowings: string[]) => {
        // Update the cookie with new user followings
        localStorage.setItem('userFollowings', JSON.stringify(newFollowings));
        setUserFollowings(newFollowings);
    };

    let handleRemoveInterest = async (topic: string) => {
        if (!userFollowings.includes(topic)) return;
        const newFollowings = userFollowings.filter(following => following !== topic);
        updateCookieFollowings(newFollowings);
        
        localStorage.removeItem("feed");// Remove the feed from local storage since we have a new setting
        await dispatch(removeFollowing({topic}));
        await dispatch(fetchUserFollowings());
    }

    let handleAddInterest = async (topic: string) => {
        if (userFollowings.includes(topic)) return;
        const newFollowings = [...userFollowings, topic];
        updateCookieFollowings(newFollowings);
        
        localStorage.removeItem("feed");// Remove the feed from local storage since we have a new setting
        await dispatch(addFollowing({topic}));
        await dispatch(fetchUserFollowings());
    }

    let MIN_INTEREST_NEWS = 2
    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-y-4">
            <Box title="What are you interested in?">
                <p className='mb-5 text-sm sm:text-md'>Select some topic you are interested in to help personalize your experience</p>
                <h1 className='text-lg sm:text-xl font-bold text-left capitalize pb-4 font-semibold flex items-center mb-1'>Add Interests</h1>
                {categories.map((category, index) => (
                    <button onClick={()=>category?handleAddInterest(category):""} className={tagDesign}>{category?CategoryIcons(category):""}{category}</button>
                ))}
            </Box>
            <Box title="Selected Interests">
                <p className='text-sm text-gray-300 mt-[-15px]'>(Min {MIN_INTEREST_NEWS} Interest)</p>
                    {userFollowings.length > 0 ? (
                        <>
                            <div className='flex mt-6 flex-wrap'>
                                {userFollowings.map((following, index) => (
                                    <div className='relative'>
                                        <p className={`${interestDesign}`}>
                                            {following ? CategoryIcons(following) : ""}{following}
                                        </p>
                                        <button onClick={()=>handleRemoveInterest(following)} className={`absolute top-[-0.5rem] right-1 text-sm rounded-full bg-black text-white h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center ${(userFollowings.length == MIN_INTEREST_NEWS)?"hidden":""}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {userFollowings.length == MIN_INTEREST_NEWS && (
                                <div className="text-red-500 text-sm leading-4 flex flex-col sm:flex-row items-center mt-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 inline-block mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                    To remove an interest, you must first add a new one, since you are already at the minimum number of required interests
                                </div>
                            )}
                        </>
                    ):(
                        <>
                            <div className="text-sm mx-auto flex flex-col items-center mt-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 block mb-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                Looks like you haven’t selected any interests yet. Start exploring to personalize your experience!
                            </div>
                        </>
                    )}
            </Box>

        </div>
    )
}

export default Interests