import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useRouter
import { selectIsAuthenticated, selectUserDetails, selectUserFollowings } from "../../lib/features/user/slice";
import { fetchCategories, fetchNewsArticles } from "../../lib/features/news/thunks";
import {
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

  useEffect(() => {
    dispatch(fetchCategories({parent_category_id:0}))
    dispatch(fetchUserFollowings());
}, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && userFollowings.length > 0) {
      Promise.all([
        dispatch(fetchNewsArticles())
      ]).then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
    }else{
      setIsLoading(false);
    }
  }, [dispatch, isAuthenticated, userFollowings]);

  useEffect(() => {
    if ((IsLoading === false && userFollowings.length === 0 && userNews.status !== 'loading' && userNews.status !== 'idle')) {
      setGetStarted(true);
    }

  }, [IsLoading, userFollowings.length, userNews.status, getStarted]);


  let HandleLoadMore = async () => {
    dispatch(fetchNewsArticles())
  }
  
  
  if(getStarted){
    return <HomeInterests userFollowings={userFollowings} categories={categories} firstName={userDetails?.first_name} setGetStarted={setGetStarted}/>
  }
  
  if(!getStarted){
    return (
      <>
        {!IsLoading && userNews.status == 'failed' && (
          <InternalError />
        )}
        {!IsLoading && userNews.status !== 'failed' && userNews.news.length > 0 && (
          <>
            { userNews.news.length > 0 ? (
                userNews.news.map((newsCard: {id:number , media: string[]; title: string; content: string; from: string; fromImage: string; publishedDate: string ; keywords: string[]; }) => (
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
                ))
              ) : (
                <div className="flex flex-col items-center mt-40">
                  <div className="p-5 pt-0 sm:p-0 sm:max-w-[400px]">
                    <p className="text-lg md:text-xl mt-4">
                      Oops! There seems to be no news for you at this moment. Have you followed any topics so far?
                      <a href="/topics" className="text-primary underline"> go to explore</a>
                    </p>
                  </div>
                </div>
              )
            }
          </>
        )}
        {userNews.status === 'loading' && (
          <>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </>
        )}
        {!IsLoading && userNews && userNews.status === 'succeeded' && LoadMore && (
          <LoadMoreButton HandleLoadMore={HandleLoadMore} />
        )}
    </>
    )
  }
};

export default Home;
