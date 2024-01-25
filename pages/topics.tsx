import Loading from '@/components/Loading';
import Loading2 from '@/components/Loading2';
import NewsCard from '@/components/NewsCard';
import { NewsArticle, selectCategoryArticles, selectNewsCategories, selectNewsStatus } from '@/lib/features/news/slice';
import { fetchCategories, fetchTopicNews } from '@/lib/features/news/thunks';
import { selectIsAuthenticated, selectUserFollowings } from '@/lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loading2 } from '@/util/illustrations';
import router from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

const topics = (props: Props) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const categories = useAppSelector(selectNewsCategories);
  const categoryArticles = useAppSelector(selectCategoryArticles);
  const userFollowing = useAppSelector(selectUserFollowings);

  const [following,setFollowing] = useState<string[]>([]);

  useEffect(() => {
    setFollowing(userFollowing)
  },[userFollowing])

  useEffect(() => {
    if(isAuthenticated){
      categories.map(topic => {
        dispatch(fetchTopicNews(topic));
      });
    }
  }, [categories, isAuthenticated])


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCategories({parent_category_id:0}))
    }
  }, [dispatch, isAuthenticated]);

  const newsStatus = useAppSelector(selectNewsStatus);
  if(newsStatus == 'failed'){
    return(<InternalError />)
  }

  let handleClick = (topic: string) => {
    if(following?.includes(topic)){
      dispatch(removeFollowing({topic}));
    }else{
      dispatch(addFollowing({topic}));
    }
  }

  return (
    <div>
      {categories.length > 0 && (
        <div className="bg-white rounded-[25px] border-solid border border-gray-100 p-5 xl:p-7 mb-10">
          <h1 className="text-xl font-bold mb-4">
            Explore a range of subjects to find your interest
          </h1>
          <div className="overflow-auto gap-1">
            {categories.map((category) => (
              <button
                key={category}
                className="bg-gray-100 text-gray-500 hover:bg-black hover:text-neutral-100 py-[5px] px-3 rounded-[25px] m-1"
                onClick={() => router.push('/topics/'+category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className='mb-5'>
        {Object.keys(categoryArticles).map(category => (
          <div className="mt-10 mb-16" key={category}>
            <div className='md:ml-0 ml-3 my-1 mb-6 capitalize flex'>
              <h2 className="text-3xl font-bold inline-block cursor-pointer" onClick={() => router.push('/topics/'+category)}>{category}</h2>
              <button onClick={()=>handleClick(category)} className={`text-sm  ${following?.includes(category)?'text-primary border border-primary':'text-black bg-primary'} ml-4 rounded-[25px] p-1 px-3 ${following?.includes(category)?"hover:bg-primary hover:text-white":"hover:bg-amber-400"}`}>
                {following?.includes(category)?"Following":"+ Follow Topic"}
              </button>
            </div>
            {typeof categoryArticles[category] !== 'string' && categoryArticles[category].slice(0, 5).map(newsCard => (
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
            {typeof categoryArticles[category] === 'string' && (
              <>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
              </>
            )}
            {typeof categoryArticles[category] !== 'string' && categoryArticles[category].length > 3 && (
              <div className="flex justify-start md:ml-0 ml-3">
                <div className="text-2xl text-primary underline flex items-center cursor-pointer hover:text-amber-400"
                onClick={() => router.push('/topics/'+category)}>
                  <h3>View all</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

import nookies from "nookies";
import { GetServerSideProps } from "next";
import { addFollowing, removeFollowing } from '@/lib/features/user/thunks';
import Placeholder from '@/components/Placeholder';
import InternalError from '@/components/InternalError';
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check authentication (e.g., check cookies or token)
  const cookies = nookies.get(context);
  const token = cookies['access_token'];
  const refresh_token = cookies['refresh_token'];
  if (!token || !refresh_token) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default topics