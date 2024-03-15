import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useRouter
import { selectIsAuthenticated, selectUserDetails, selectUserFollowings } from "../../lib/features/user/slice";
import { fetchCategories, fetchNewsArticles } from "../../lib/features/news/thunks";
import {
  NewsArticle,
  selectLoadMore,
  selectNewsArticles,
  selectNewsCategories,
  selectNewsStatus
} from "../../lib/features/news/slice";
import InternalError from "../../components/InternalError";
import NewsCard from "../../components/NewsCard";
import Placeholder from "../../components/Placeholders/NewsCardPlaceholder";
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import LoadMoreButton from '../../components/Buttons/LoadMoreButton';
import { fetchUserFollowings } from '../../lib/features/user/thunks';
import Box from '../../components/Box/Box';
import CategoryIcons from '../../util/CategoryIcons';
import HomeInterests from './HomeInterest';

const Home: React.FC = () => {
  const dispatch = useAppDispatch(); // Use Redux's useDispatch
  const navigate = useNavigate(); // Use useNavigate for navigation
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userFollowings = useAppSelector(selectUserFollowings);
  const categories = useAppSelector(selectNewsCategories);
  const LoadMore = useAppSelector(selectLoadMore);
  const userNews = useAppSelector(selectNewsArticles);
  const userDetails = useAppSelector(selectUserDetails)
  const [IsLoading, setIsLoading] = React.useState(true);
  const [getStarted, setGetStarted] = React.useState(false);

  const start = () => {
    setGetStarted(false);
    if (isAuthenticated) {
      setIsLoading(true); // Set loading at the beginning
      dispatch(fetchCategories({parent_category_id:0}))
      console.log("about to get followers")
      dispatch(fetchUserFollowings()).unwrap().then((res) => {
        if (res.length >= 3) {
          console.log("following is more than 3")
          setGetStarted(false);
          dispatch(fetchNewsArticles()).finally(() => setIsLoading(false));
        } else {
          console.log("following is less than 3")
          setGetStarted(true);
          setIsLoading(false);
        }
      });
    }
  }
  useEffect(() => {
    start()
  }, [dispatch, isAuthenticated]);

  let HandleLoadMore = async () => {
    dispatch(fetchNewsArticles())
  }
  
  //this is for the fact that it shows the homeinterests for fraction of seconds before the news loads
  //userNews.status !== 'loading'
  if(getStarted && !IsLoading && userNews.status !== 'loading'){
    return <HomeInterests userFollowings={userFollowings} categories={categories} firstName={userDetails?.first_name} start={start}/>
  }
  
  if(!getStarted){
    return (
      <>
        {(!IsLoading && userNews.status == 'failed') && (
          <InternalError />
        )}
        {((!IsLoading && userNews.status !== 'failed' && userNews.status !== 'loading')||userNews.news.length > 0) && (
          <>
            { userNews.news.length > 0 ? (
                userNews.news.map((newsCard: NewsArticle) => (
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
                ))
              ) : (
                <div className="flex flex-col items-center mt-10 xl:mt-20">
                  <div className="p-5 pt-0 sm:p-0 sm:max-w-[400px]">
                    <img src="/empty.png" className='max-w-full md:max-w-[250px] w-full md:w-2/3 mx-auto'/>
                    <p className="text-lg mt-0">
                      Oops! There seems to be no news for you at this moment. Please Consider adding more interests! &nbsp;
                      <a href="/topics" className="text-primary underline">go to explore</a>
                    </p>
                  </div>
                </div>
              )
            }
          </>
        )}
        {(IsLoading || userNews.status === 'loading') && ( //when user sign up, they add interests. we add the interest bulk in the backend. so for couple of seconds we need to load. thus, we have userFollowings.length < 3
          <>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </>
        )}
        {(!IsLoading && userNews && userNews.status === 'succeeded' && LoadMore) && (
          <LoadMoreButton HandleLoadMore={HandleLoadMore} />
        )}
    </>
    )
  }
};

export default Home;
