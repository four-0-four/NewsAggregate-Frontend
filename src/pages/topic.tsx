import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation and useParams to access route params
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { selectIsAuthenticated, selectUserFollowings } from '../lib/features/user/slice';
import { selectCategoryArticles, selectLoadMore } from '../lib/features/news/slice';
import { fetchTopicNews } from '../lib/features/news/thunks';
import { addFollowing, removeFollowing } from '../lib/features/user/thunks';
import NewsCard from '../components/NewsCard';
import InternalError from '../components/InternalError';
import Placeholder from '../components/Placeholders/NewsCardPlaceholder';

const TopicPage: React.FC = ({}) => {
    // Function to format the date
    const { topic } = useParams();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const userFollowing = useAppSelector(selectUserFollowings);
    const categoryArticles = useAppSelector(selectCategoryArticles);
    const LoadMore = useAppSelector(selectLoadMore);

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
        dispatch(removeFollowing({topic}));
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
          <div className='md:ml-0 ml-3 my-1 mb-6 capitalize flex'>
            <h2 className="text-3xl font-bold inline-block">{topic}</h2>
            {category.status === 'succeeded'  && (
              <button onClick={()=>handleClick(topic)} className={`text-sm  ${following?.includes(topic)?'text-primary border border-primary':'text-black bg-primary'} ml-4 rounded-[20px] p-1 px-3 ${following?.includes(topic)?"hover:bg-primary hover:text-white":"hover:bg-amber-400"}`}>
                {following?.includes(topic)?"Following":"+ Follow Topic"}
              </button>
            )}
          </div>
          <div className='flex flex-col items-center'>
            <img src={"/empty.png"} alt="No News Found" className='max-w-[10%] sm:max-w-[50%] md:max-w-[30%]'/>
            <h1 className='text-center text-sm sm:text-md font-medium mt-4 max-w-[500px]'>
              Sorry, we couldn't find any news in this category. We're very sorry for the inconvenience. We recommend exploring other topics that might interest you. 
              &nbsp;&nbsp;<br/><a className='underline text-primary'>explore page</a>
            </h1>
          </div>
        </div>
      )
    }    
    
    return (
        <div className='mb-5'>
          <div className="" key={topic}>
            <div className='md:ml-0 ml-3 my-1 mb-6 capitalize flex'>
              <h2 className="text-3xl font-bold inline-block">{topic}</h2>
              {category && category.status === 'succeeded'  && (
                <button onClick={()=>handleClick(topic)} className={`text-sm  ${following?.includes(topic)?'text-primary border border-primary':'text-black bg-primary'} ml-4 rounded-[20px] p-1 px-3 ${following?.includes(topic)?"hover:bg-primary hover:text-white":"hover:bg-amber-400"}`}>
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
                imageSrc={newsCard.media[0]}
                title={newsCard.title}
                description={newsCard.content}
                from={newsCard.from}
                fromImage={newsCard.fromImage}
                date={newsCard.publishedDate}
                tags={newsCard.keywords}
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
                <div className="flex justify-center mt-5">
                    <button onClick={HandleLoadMore} className="text-2xl text-primary flex items-center cursor-pointer hover:text-amber-400 px-4 py-1 border-2 border-primary rounded-[20px]">
                        <h3>Load More</h3>
                    </button>
                </div>
            )}
          </div>
      </div>
    );
}

export default TopicPage;