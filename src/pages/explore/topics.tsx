import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated, selectUserFollowings } from '../../lib/features/user/slice';
import { NewsArticle, selectCategoryArticles, selectNewsCategories, selectNewsStatus } from '../../lib/features/news/slice';
import { fetchCategories, fetchTopicNews } from '../../lib/features/news/thunks';
import { addFollowing, removeFollowing } from '../../lib/features/user/thunks';
import NewsCard from '../../components/NewsCard';
import InternalError from '../../components/InternalError';
import Placeholder from '../../components/Placeholders/NewsCardPlaceholder';


type Props = {}

const Topics = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const categories = useAppSelector(selectNewsCategories);
  const categoryArticles = useAppSelector(selectCategoryArticles);
  const userFollowing = useAppSelector(selectUserFollowings);
  const [following, setFollowing] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    setFollowing(userFollowing);
  }, [userFollowing]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      if (isAuthenticated) {
        setIsLoading(true); // Start loading
        await dispatch(fetchCategories({ parent_category_id: 0 }));
        setIsLoading(false); // End loading after categories are fetched
      }
    };

    fetchCategoriesData();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      categoryArticles.forEach(category => {
        if (category.status === 'idle') {
          dispatch(fetchTopicNews(category.name));
        }
      });
    }
  }, [categoryArticles, isAuthenticated, dispatch]);

  const newsStatus = useAppSelector(selectNewsStatus);
  if (newsStatus === 'failed') {
    return <InternalError />;
  }

  let handleClick = (topic: string) => {
    if (following.includes(topic)) {
      return;//it should only be removed from the profile page
    } else {
      dispatch(addFollowing({ topic }));
    }
  };
  
  return (
    <div>
      {!isLoading && categories.length == 0 && (
        <div>
          <div className='md:ml-0 ml-3 my-1 mb-6 capitalize flex'>
            <h2 className="text-3xl font-bold inline-block">Explore Page</h2>
          </div>
          <div className='flex flex-col items-center'>
            <img src={"/empty.png"} alt="No News Found" className='max-w-[10%] sm:max-w-[50%] md:max-w-[30%]'/>
            <h1 className='text-center text-sm sm:text-md font-medium mt-4 max-w-[500px]'>
              Sorry, something went wrong. We're very sorry for the inconvenience. We would thankful if you could report this issue to us. 
            </h1>
          </div>
        </div>
      )}
      {!isLoading && categories.length > 0 && (
        <div className="bg-white rounded-[20px]  lg:max-w-[750px]  border-solid border border-gray-100 p-5 xl:p-7 mb-10">
          <h1 className="text-xl font-bold mb-4">
            Explore a range of subjects to find your interest
          </h1>
          <div className="overflow-auto gap-1">
            {categories.map((category) => (
              <button
                key={category}
                className="bg-gray-100 text-gray-500 hover:bg-black hover:text-neutral-100 py-[5px] px-3 rounded-[20px] m-1"
                onClick={() => navigate('/topics/'+category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className='mb-5'>
        {categoryArticles.map(category => (
          <div className="mt-10 mb-16" key={category.name}>
            {category.status != "idle" && (
              <div className='md:ml-0 ml-3 my-1 mb-6 capitalize flex'>
                <h2 className="text-3xl font-bold inline-block cursor-pointer" onClick={() => navigate('/topics/'+category.name)}>{category.name}</h2>
                <button onClick={()=>handleClick(category.name)} className={`text-sm  ${following?.includes(category.name)?'text-primary border border-primary cursor-default outline-0':'text-black bg-primary hover:bg-amber-400'} ml-4 rounded-[20px] p-1 px-3`}>
                  {following?.includes(category.name)?"Following":"+ Follow Topic"}
                </button>
              </div>
            )}
            {category.status == "succeeded" && category.news?.length > 0 && category.news.slice(0, 5).map(newsCard => (
              <NewsCard
                key={newsCard.id}
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
            {category.status == "loading" && (
              <>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
              </>
            )}
            {category.status == "succeeded" && (category.news?.length) > 3 && (
              <div className="flex justify-start md:ml-0 ml-3">
                <div className="text-2xl text-primary underline flex items-center cursor-pointer hover:text-amber-400"
                onClick={() => navigate('/topics/'+category.name)}>
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

export default Topics