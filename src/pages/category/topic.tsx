import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation and useParams to access route params
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated, selectUserFollowings } from '../../lib/features/user/slice';
import { selectCategoryArticles, selectLoadMore } from '../../lib/features/news/slice';
import { fetchTopicNews } from '../../lib/features/news/thunks';
import { addFollowing, removeFollowing } from '../../lib/features/user/thunks';
import NewsCard from '../../components/NewsCard';
import InternalError from '../../components/InternalError';
import Placeholder from '../../components/Placeholders/NewsCardPlaceholder';
import LoadMoreButton from '../../components/Buttons/LoadMoreButton';

const TopicPage: React.FC = ({}) => {
    // Function to format the date
    const { topic } = useParams();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    let userFollowing = useAppSelector(selectUserFollowings);
    const categoryArticles = useAppSelector(selectCategoryArticles);
    const LoadMore = useAppSelector(selectLoadMore);

    if (!userFollowing || userFollowing.length === 0) {
      const userFollowingsFromStorage = localStorage.getItem("userFollowings");
  
      // Parse the JSON string from cookies. If it's not present or parsing fails, default to an empty array
      try {
          userFollowing = userFollowingsFromStorage ? JSON.parse(userFollowingsFromStorage) : [];
      } catch (error) {
          userFollowing = [];
      }
    }

    useEffect(() => {
      if (isAuthenticated && topic && (categoryArticles.find(cat => cat.name === topic)?.news.length === 0 || categoryArticles.length === 0)) {
          dispatch(fetchTopicNews(topic));
      }
    }, [dispatch, isAuthenticated, topic]);

    const [following,setFollowing] = useState<string[]>([]);

    useEffect(() => {
      setFollowing(userFollowing)
    },[userFollowing])

    let handleClick = (topic: string) => {
      if(following?.includes(topic)){
        return; //this should only be removed from the profile page
      }else{
        dispatch(addFollowing({topic}));
      }
    }

    let HandleLoadMore = async () => {
      if(topic){
        dispatch(fetchTopicNews(topic))
      }
    }

    if(!topic){
      return (
        <div>
          <h1>Invalid Topic</h1>
        </div>
      )
    }

    const category = categoryArticles.find(cat => cat.name === topic)
    if(category && category.status !== 'loading' && category.news?.length === 0){
      return (
        <div>
          <div className='ml-3 my-1 mb-6 capitalize flex'>
            <h2 className="text-3xl font-bold inline-block">{topic}</h2>
            {category.status === 'succeeded'  && (
              <button onClick={()=>handleClick(topic)} className={`text-sm  ${following?.includes(topic)?'text-primary border border-primary cursor-default outline-0':'text-black bg-primary hover:bg-amber-400'} ml-4 rounded-[20px] p-1 px-3`}>
                {following?.includes(topic)?"Following":"+ Follow Topic"}
              </button>
            )}
          </div>
          <div className='flex flex-col items-center'>
            <img src={"/empty.png"} alt="No News Found" className='max-w-[10%] sm:max-w-[50%] md:max-w-[30%]'/>
            <h1 className='text-center text-sm sm:text-md font-medium mt-4 max-w-[500px]'>
              Sorry, we couldn't find any news in this category. We're very sorry for the inconvenience. We recommend exploring other topics that might interest you. 
              &nbsp;&nbsp;<br/><a className='underline text-primary cursor-pointer' href="/topics">explore page</a>
            </h1>
          </div>
        </div>
      )
    }    
    
    return (
        <div className='mb-5'>
          <div className="" key={topic}>
            <div className='ml-3 my-1 mb-6 capitalize flex'>
              <h2 className="text-3xl font-bold inline-block">{topic}</h2>
              {category && category.status === 'succeeded'  && (
                <button onClick={()=>handleClick(topic)} className={`text-sm  ${following?.includes(topic)?'text-primary border border-primary outline-0 cursor-default':'text-black bg-primary hover:bg-amber-400'} ml-4 rounded-[20px] p-1 px-3`}>
                  {following?.includes(topic)?"Following":"+ Follow Topic"}
                </button>
              )}
            </div>
            {category == undefined || category.status === 'failed' && (
              <InternalError />
            )}
            {category && category.news.length > 0 && category.news.map(newsCard => (
              <NewsCard
                id={newsCard.id}
                imageSrc={newsCard.media}
                title={newsCard.title}
                shortSummary={newsCard.shortSummary}
                from={newsCard.from}
                fromImage={newsCard.fromImage}
                date={newsCard.publishedDate}
                tags={newsCard.keywords}
                isBookmarked={newsCard.isBookmarked}
              />
            ))}
            {category && category.status == 'loading' && (
              <>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
              </>
            )}
            {category && category.status === 'succeeded' && LoadMore && (
                <LoadMoreButton HandleLoadMore={HandleLoadMore} />
            )}
          </div>
      </div>
    );
}

export default TopicPage;