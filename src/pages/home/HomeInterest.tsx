import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Box from '../../components/Box/Box'
import { addFollowing, removeFollowing } from '../../lib/features/user/thunks';
import { useAppDispatch } from '../../lib/hooks';
import CategoryIcons from '../../util/CategoryIcons';
import React, { useEffect } from 'react'

type HomeInterestsProps = {
    userFollowings: (string)[];
    categories: (string | undefined)[];
    firstName?: string;
    setGetStarted?: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
  const HomeInterests: React.FC<HomeInterestsProps> = ({ userFollowings, categories, firstName, setGetStarted }) => {
    const dispatch = useAppDispatch();
    let tagDesign = "text-sm sm:text-md inline-block mr-2 mb-2 sm:mr-3 sm:mb-3 px-4 py-2 capitalize border border-primary rounded-[20px] transition-colors duration-300 hover:bg-primary hover:text-black";
    let interestDesign = "text-sm sm:text-md inline-block mr-3 mb-3 px-4 py-2 capitalize bg-primary border border-primary rounded-[20px] transition-colors duration-300 hover:bg-opacity-80";


    let handleRemoveInterest = (topic: string) => {
        if (!userFollowings.includes(topic)) return;
        dispatch(removeFollowing({topic}));
    }

    let handleAddInterest = (topic: string) => {
        if (userFollowings.includes(topic)) return;
        dispatch(addFollowing({topic}));
    }

    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-y-4">
            <Box title={`Welcome, ${firstName}!`}>
                <p className='mb-5 text-sm sm:text-md'>To tailor your Farabix experience, please select the interests from below. Choose a minimum of 3!</p>
                <h1 className='text-lg sm:text-xl font-bold text-left capitalize pb-4 font-semibold flex items-center mb-1'>Add Interests</h1>
                {categories.map((category, index) => (
                    <button onClick={()=>category?handleAddInterest(category):""} className={tagDesign}>{category?CategoryIcons(category):""}{category}</button>
                ))}
                <div className='flex justify-end mt-5'>
                    <PrimaryButton text="Get Started" onClick={()=>setGetStarted?setGetStarted(false):""} disabled={userFollowings.length<1}/>
                </div>
            </Box>
            {userFollowings.length>0 && (<Box title="Selected Interests">
                <div className='flex mt-3'>
                    {userFollowings.map((following, index) => (
                        <div className='relative'>
                            <p className={`${interestDesign}`}>
                                {following ? CategoryIcons(following) : ""}{following}
                            </p>
                            <button onClick={()=>handleRemoveInterest(following)} className='absolute top-[-0.5rem] right-1 text-sm rounded-full bg-black text-white h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </Box>
            )}

        </div>
    )
}

export default HomeInterests