import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/lib/features/user/slice';
import { fetchOneNewsArticle, fetchTopicNews } from '@/lib/features/news/thunks';
import {selectTopicArticles} from '@/lib/features/news/slice';
import NewsCard from '@/components/NewsCard';

const topic: React.FC<> = ({}) => {
    // Function to format the date
    const router = useRouter()
    
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
    const topic = router.query.newsTopic as string;
    useEffect(() => {
        if (isAuthenticated) {
            const topic = router.query.newsTopic as string;
            dispatch(fetchTopicNews(topic));
        }
    }, [dispatch, isAuthenticated, router.query.newsTopic]);


    let categoryArticles = useAppSelector(selectTopicArticles);
    return (
        <div className='mb-5'>
          <div className="" key={topic}>
            <div className='my-1 mb-6 capitalize flex'>
              <h2 className="text-3xl font-bold inline-block">{topic}</h2>
              <button className='text-sm text-black bg-primary ml-4 rounded-[25px] p-1 px-3 hover:bg-amber-400'>+ Follow Topic</button>
            </div>
            {categoryArticles && categoryArticles?.map(newsCard => (
              <NewsCard
                key={newsCard.id}
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