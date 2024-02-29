// components/Sidebar.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated } from '../../lib/features/user/slice';
import { RootState } from '../../lib/store';
import Interests from '../Interests';
import { fetchUserFollowings } from '../../lib/features/user/thunks';
import Sidebar from './Sidebar';

const MainSidebar = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    let userFollowings = useSelector((state: RootState) => state.user.followings);
    if (userFollowings === undefined){
        userFollowings = [];
    }
    useEffect(() => {
        dispatch(fetchUserFollowings());
    }, [isAuthenticated]);


    return (
        <div className=''>
                <Interests interests={userFollowings} />
        </div>
    );
};

export default MainSidebar;
