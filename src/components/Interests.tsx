import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    interests: string[];
}

const Interests: React.FC<Props> = ({interests}) => {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1 className='text-lg font-bold my-2 mt-0 px-2'>Your Interests</h1>
            {interests.length > 0 && (
            <>
                <div className={`flex flex-wrap gap-1 xl:gap-2 overflow-y-auto max-h-[240px] snap-y px-3 xl:px-4`}>
                    {interests.map(interest => (
                        <div onClick={() => navigate('/topics/'+interest)} key={interest} className="snap-start bg-neutral-100 text-neutral-600 p-1 px-3 rounded-[20px] text-sm xl:text-md hover:bg-amber-200 cursor-pointer">
                            {interest}
                        </div>
                    ))}
                </div>
            </>
            )}
            {interests.length === 0 && (
                <div className='px-2'>
                    <h3 className='font-light my-2'>You are not following any interests!</h3>
                </div>
            )}
        </div>
    )
    }

export default Interests