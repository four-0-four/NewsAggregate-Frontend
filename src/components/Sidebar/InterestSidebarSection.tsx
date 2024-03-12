// components/Sidebar.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated } from '../../lib/features/user/slice';
import { RootState } from '../../lib/store';
import Interests from '../Interests';
import { fetchUserFollowings } from '../../lib/features/user/thunks';
import Cookies from 'js-cookie';
import Sidebar from './Sidebar';

const MainSidebar = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    let userFollowings = useSelector((state: RootState) => state.user.followings);
    if (!userFollowings){
        const userFollowingsFromCookies = Cookies.get("userFollowings");
    
        // Parse the JSON string from cookies. If it's not present or parsing fails, default to an empty array
        try {
            userFollowings = userFollowingsFromCookies ? JSON.parse(userFollowingsFromCookies) : [];
        } catch (error) {
            userFollowings = [];
        }
    }
    useEffect(() => {
        dispatch(fetchUserFollowings());
    }, [isAuthenticated]);


    return (
        <div className=''>
                {userFollowings.length > 0 && (
                    <Interests interests={userFollowings} />
                )}
        </div>
    );
};

export default MainSidebar;
