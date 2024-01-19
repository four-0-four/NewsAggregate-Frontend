import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useSelector } from 'react-redux';
import { addFollowingStatus, selectIsAuthenticated, selectUserFollowings } from '@/lib/features/user/slice';
import { fetchOneNewsArticle, fetchTopicNews } from '@/lib/features/news/thunks';
import {selectTopicArticles} from '@/lib/features/news/slice';
import NewsCard from '@/components/NewsCard';
import { addFollowing, removeFollowing } from '@/lib/features/user/thunks';

const topic: React.FC = ({}) => {
    // Function to format the date
    const [following,setFollowing] = useState<string[]>([]);
    const router = useRouter()
    
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
    const userFollowing = useAppSelector(selectUserFollowings);
    let categoryArticles = useAppSelector(selectTopicArticles);
    const topic = router.query.newsTopic as string;

    useEffect(() => {
        const topic = router.query.newsTopic as string;
        if (isAuthenticated && topic) {
            dispatch(fetchTopicNews(topic));
        }
    }, [dispatch, isAuthenticated, router.query.newsTopic]);

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

    return (
        <div className='mb-5'>
          <div className="" key={topic}>
            <div className='my-1 mb-6 capitalize flex'>
              <h2 className="text-3xl font-bold inline-block">{topic}</h2>
              <button onClick={()=>handleClick(topic)} className={`text-sm  ${following?.includes(topic)?'text-primary border border-primary':'text-black bg-primary'} ml-4 rounded-[25px] p-1 px-3 ${following?.includes(topic)?"hover:bg-primary hover:text-white":"hover:bg-amber-400"}`}>
                {following?.includes(topic)?"Following":"+ Follow Topic"}
              </button>
            </div>
            {categoryArticles.length > 0 && categoryArticles?.map(newsCard => (
              <NewsCard
                id={newsCard.id}
                imageSrc={newsCard.media[0]}
                title={newsCard.title}
                description={newsCard.content}
                from={newsCard.from}
                fromImage={newsCard.fromImage}
                date={new Date(newsCard.publishedDate)}
                tags={newsCard.keywords}
              />
            ))}
            {categoryArticles && (
                <div className="flex justify-center mt-5">
                    <div className="text-2xl text-primary flex items-center cursor-pointer hover:text-amber-400 px-4 py-1 border-2 border-primary rounded-[25px]">
                        <h3>Load More</h3>
                    </div>
                </div>
            )}
          </div>
      </div>
    );
}

export default topic;