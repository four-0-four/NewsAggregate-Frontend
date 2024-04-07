// components/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated } from '../../lib/features/user/slice';
import { RootState } from '../../lib/store';
import Interests from '../Interests';
import { fetchUserFollowings } from '../../lib/features/user/thunks';
import Cookies from 'js-cookie';
import Sidebar from './Sidebar';
import { getAllUserNewsSourcesPreferences } from '../../lib/features/newsSource/thunks';
import { InterestedNewsSources, NewsSourceState } from '../../lib/features/newsSource/slice';
import NewsSourceList from '../NewsSourceList';

const MainSidebar = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [is, setIs] = useState(true);
    let userFollowings = useSelector((state: RootState) => state.user.followings);
    let InterestedNewsSourcesState:NewsSourceState[] = useAppSelector(InterestedNewsSources) ?? []

    if (!userFollowings || userFollowings.length === 0) {
        const userFollowingsFromStorage = localStorage.getItem("userFollowings");
    
        // Parse the JSON string from cookies. If it's not present or parsing fails, default to an empty array
        try {
            userFollowings = userFollowingsFromStorage ? JSON.parse(userFollowingsFromStorage) : [];
        } catch (error) {
            userFollowings = [];
        }
    }

    if(!InterestedNewsSourcesState || InterestedNewsSourcesState.length === 0){
        const InterestedNewsSourcesFromCookies = localStorage.getItem("newsSourcePreferences");
        try {
            InterestedNewsSourcesState = InterestedNewsSourcesFromCookies ? JSON.parse(InterestedNewsSourcesFromCookies) : [];
        } catch (error) {
            InterestedNewsSourcesState = [];
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            Promise.all([
                dispatch(getAllUserNewsSourcesPreferences()),
                dispatch(fetchUserFollowings())
            ])
        } 
    }, [isAuthenticated]);

    return (
        <div className=''>
                {userFollowings.length > 0 && (
                    <Interests interests={userFollowings} />
                )}
                {InterestedNewsSourcesState.length > 0 && (
                    <NewsSourceList newsSources={InterestedNewsSourcesState} />
                )}
        </div>
    );
};

export default MainSidebar;
