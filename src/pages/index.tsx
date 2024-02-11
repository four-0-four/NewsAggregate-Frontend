import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useRouter
import { selectIsAuthenticated } from "../lib/features/user/slice";
import { fetchNewsArticles } from "../lib/features/news/thunks";
import {
  selectLoadMore,
  selectNewsArticles,
  selectNewsStatus
} from "../lib/features/news/slice";
import InternalError from "../components/InternalError";
import NewsCard from "../components/NewsCard";
import Placeholder from "../components/Placeholders/NewsCardPlaceholder";
import { useAppDispatch, useAppSelector } from '../lib/hooks';

const Home: React.FC = () => {
  const dispatch = useAppDispatch(); // Use Redux's useDispatch
  const navigate = useNavigate(); // Use useNavigate for navigation
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const LoadMore = useAppSelector(selectLoadMore);
  const userNews = useAppSelector(selectNewsArticles);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNewsArticles());
    } else {
      navigate("/landing"); // Use navigate for redirection
    }
  }, [dispatch, isAuthenticated, navigate]);

  let HandleLoadMore = async () => {
    dispatch(fetchNewsArticles())
  }

  return (
    <>
      {userNews.status == 'failed' && (
        <InternalError />
      )}
      {userNews.status !== 'failed' && userNews.news.length > 0 && (
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
      {userNews.status == 'loading' && (
        <>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </>
      )}
      {userNews && userNews.status === 'succeeded' && LoadMore && (
        <div className="flex justify-center mt-5">
          <button onClick={HandleLoadMore} className="text-2xl text-primary flex items-center cursor-pointer hover:text-amber-400 px-4 py-1 border-2 border-primary rounded-[20px]">
            <h3>Load More</h3>
          </button>
        </div>
      )}
  </>
  )
};

export default Home;
