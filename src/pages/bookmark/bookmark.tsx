import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation and useParams to access route params
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated, selectUserFollowings } from '../../lib/features/user/slice';
import { selectBookmarks, selectCategoryArticles, selectLoadMore } from '../../lib/features/news/slice';
import { fetchTopicNews, getAllBookmarksForUser } from '../../lib/features/news/thunks';
import { addFollowing, removeFollowing } from '../../lib/features/user/thunks';
import NewsCard from '../../components/NewsCard';
import InternalError from '../../components/InternalError';
import Placeholder from '../../components/Placeholders/NewsCardPlaceholder';
import LoadMoreButton from '../../components/Buttons/LoadMoreButton';

const BookmarkPage: React.FC = ({}) => {
    // Function to format the date
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const bookmarks = useAppSelector(selectBookmarks);

    useEffect(() => {
      if (isAuthenticated) {
          dispatch(getAllBookmarksForUser());
      }
    }, [dispatch, isAuthenticated]);

    
    
    if(bookmarks.status !== 'loading' && bookmarks.status !== 'failed' && bookmarks.news?.length === 0){  
      return (
        <div>
          <div className='ml-3 my-1 mb-6 capitalize flex'>
            <h2 className="text-3xl font-bold inline-block">Bookmarks</h2>
          </div>
          <div className='flex flex-col items-center'>
            <img src={"/Bookmarks.png"} alt="No News Found" className='max-w-[10%] sm:max-w-[50%] md:max-w-[30%]'/>
            <h1 className='text-center text-sm sm:text-md font-medium mt-4 max-w-[500px]'>
              Sorry, You don't have any bookmarks yet!
            </h1>
          </div>
        </div>
      )
    }

    return (
        <div className='mb-5'>
          <div className="">
            <div className='ml-3 my-1 mb-6 capitalize flex'>
              <h2 className="text-3xl font-bold inline-block">Bookmarks</h2>
            </div>
            {bookmarks.status === 'failed' && (
              <InternalError />
            )}
            {bookmarks && bookmarks.news.length > 0 && bookmarks.news.map(newsCard => (
              <NewsCard
                id={newsCard.id}
                imageSrc={newsCard.media[0]}
                title={newsCard.title}
                shortSummary={newsCard.shortSummary}
                from={newsCard.from}
                fromImage={newsCard.fromImage}
                date={newsCard.publishedDate}
                tags={newsCard.keywords}
                isBookmarked={newsCard.isBookmarked}
              />
            ))}
            {bookmarks && bookmarks.status == 'loading' && (
              <>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
              </>
            )}
          </div>
      </div>
    );
}

export default BookmarkPage;