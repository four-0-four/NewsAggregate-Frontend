import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useRouter
import { selectIsAuthenticated, selectUserDetails, selectUserFollowings } from "../../lib/features/user/slice";
import { fetchCategories, fetchNewsArticles, getAllBookmarksForUser } from "../../lib/features/news/thunks";
import {
  NewsArticle,
  addFeed,
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
import HomeInterests from './HomeInterest';

const Home: React.FC = () => {
  const dispatch = useAppDispatch(); // Use Redux's useDispatch
  const navigate = useNavigate(); // Use useNavigate for navigation
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userFollowings = useAppSelector(selectUserFollowings);
  const categories = useAppSelector(selectNewsCategories);
  const LoadMore = useAppSelector(selectLoadMore);
  const userDetails = useAppSelector(selectUserDetails)
  const [IsLoading, setIsLoading] = React.useState(false);
  const [getStarted, setGetStarted] = React.useState(false);
  let userNews = useAppSelector(selectNewsArticles);

  //parse the local feed from local storage
  let localfeed = localStorage.getItem("feed")
  if (isAuthenticated && userNews.news.length === 0 && localfeed !== null) {
    let parsedFeed = JSON.parse(localfeed)
    let loadedNewsFeed = {
      news: parsedFeed.articles,
      last_news_time: parsedFeed.last_news_time,
      status: 'succeeded' as const,
      number_of_articles_to_fetch: 10,
      load_more: parsedFeed.load_more
    }
    userNews = loadedNewsFeed
    dispatch(addFeed(loadedNewsFeed))
  }

  //TODO: PRELOAD SOMEOF THE STUFF. LIKE GETTING BOOKMARKS, EXPLORE IN ADVANCE
  //preload the bookmarks
  const preloadBookmarks = async () => {
    let localBookmarks = localStorage.getItem("bookmarks");
      if (isAuthenticated && localBookmarks !== null) {
        let newBookmarkState = {
          news: JSON.parse(localBookmarks) as NewsArticle[],
          status: "done" as const
        }
        if(newBookmarkState.news.length === 0){
          dispatch(getAllBookmarksForUser());
        }
      }else if(localBookmarks === null){
        dispatch(getAllBookmarksForUser());
      }
  }

  const start = () => {
    setGetStarted(false);
    if (isAuthenticated) {
      setIsLoading(true); // Set loading at the beginning
      dispatch(fetchCategories({parent_category_id:0}))
      dispatch(fetchUserFollowings()).unwrap().then((res) => {
        if (res.length >= 2) {
          setGetStarted(false);
          dispatch(fetchNewsArticles()).finally(() => setIsLoading(false));
        } else {
          setGetStarted(true);
          setIsLoading(false);
        }
      });
    }
  }

  useEffect(() => {
    if(isAuthenticated){
      preloadBookmarks()
    }
    //loadfeedfromstorage()
    if(userNews.news.length == 0){
      start()
    }
  }, [dispatch, isAuthenticated]);

  let HandleLoadMore = async () => {
    dispatch(fetchNewsArticles())
  }
  
  //this is for the fact that it shows the homeinterests for fraction of seconds before the news loads
  //userNews.status !== 'loading'
  if(getStarted && !IsLoading && userNews.status !== 'loading'){
    return <HomeInterests userFollowings={userFollowings} categories={categories} firstName={userDetails?.first_name} start={start}/>
  }
  
  console.log("state:", !IsLoading, userNews)
  if(!getStarted){
    return (
      <>
        {(!IsLoading && userNews.status == 'failed') && (
          <InternalError />
        )}
        {((!IsLoading && userNews.status === 'succeeded')||userNews.news.length > 0) && (
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
