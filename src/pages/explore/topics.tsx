import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated, selectUserFollowings } from '../../lib/features/user/slice';
import { NewsArticle, addExplore, selectCategoryArticles, selectExploreArticles, selectLoadMore, selectNewsCategories, selectNewsStatus } from '../../lib/features/news/slice';
import { fetchCategories, fetchExplore, fetchTopicNews } from '../../lib/features/news/thunks';
import { addFollowing, removeFollowing } from '../../lib/features/user/thunks';
import NewsCard from '../../components/NewsCard';
import InternalError from '../../components/InternalError';
import Placeholder from '../../components/Placeholders/NewsCardPlaceholder';
import LoadMoreButton from '../../components/Buttons/LoadMoreButton';


type Props = {}

const Topics = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const categories = useAppSelector(selectNewsCategories);
  let exploreArticles = useAppSelector(selectExploreArticles);
  const LoadMore = useAppSelector(selectLoadMore);
  const [isLoading, setIsLoading] = useState(true); // Added loading state


  useEffect(() => {
    const fetchCategoriesData = async () => {
      if (isAuthenticated) {
        setIsLoading(true); // Start loading
        await dispatch(fetchCategories({ parent_category_id: 0 }));
        await dispatch(fetchExplore(0))
        setIsLoading(false); // End loading after categories are fetched
      }
    };
    fetchCategoriesData();
  }, [dispatch, isAuthenticated]);

  let HandleLoadMore = async () => {
    dispatch(fetchExplore(0))
  }

  const newsStatus = useAppSelector(selectNewsStatus);
  if (newsStatus === 'failed') {
    return <InternalError />;
  }
  
  return (
    <div>
      {!isLoading && exploreArticles.status === 'failed' && (
        <div>
          <div className='flex flex-col items-center'>
            <img src={"/empty.png"} alt="No News Found" className='max-w-[10%] sm:max-w-[50%] md:max-w-[30%]'/>
            <h1 className='text-center text-sm sm:text-md font-medium mt-4 max-w-[500px]'>
              Sorry, something went wrong. We're very sorry for the inconvenience. We would thankful if you could report this issue to us. 
            </h1>
          </div>
        </div>
      )}
      {!isLoading && exploreArticles.status !== 'failed' &&  categories.length > 0 && (
        <div className="bg-white rounded-[20px]  lg:max-w-[750px]  border-solid border border-gray-100 p-5 xl:p-7 mb-5">
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
      <div className=''>
        <div className="mb-5" key={"exploreContainer"}>
          {exploreArticles.news?.length > 0 && exploreArticles.news.map(newsCard => (
            <NewsCard
              key={newsCard.id}
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
          {exploreArticles.status == "loading" && (
            <>
              <Placeholder />
              <Placeholder />
              <Placeholder />
              <Placeholder />
              <Placeholder />
            </>
          )}
          {exploreArticles.status === 'succeeded' && LoadMore && (
            <LoadMoreButton HandleLoadMore={HandleLoadMore} />
          )}
          {exploreArticles.status === 'succeeded' && !LoadMore && (
            <div className="flex justify-center">
              <p className="text-center text-gray-500">You have reached the end</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Topics
