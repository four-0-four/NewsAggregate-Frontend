import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated } from '../../lib/features/user/slice';
import { fetchOneNewsArticle } from '../../lib/features/news/thunks';
import { NewsArticle, selectNewsStatus, selectSelectedArticle } from '../../lib/features/news/slice';
import Loading from '../../components/Loading';

type NewsComponentProps = {};

const news: React.FC<NewsComponentProps> = ({}) => {
    // Function to format the date
    const router = useRouter()
    
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            // Access the newsID from the query parameters using router.query.newsID
            const newsID = router.query.newsID as string;
            dispatch(fetchOneNewsArticle(newsID));
        }
    }, [dispatch, isAuthenticated, router.query.newsID]);


    let selectedArticle: undefined|NewsArticle|null = undefined;
    if (isAuthenticated) {
        selectedArticle = useAppSelector(selectSelectedArticle);
    }

    const formatDate = (stringdate: string) => {
        if(stringdate === undefined) return;
        
        let date = new Date(stringdate)
        const now = new Date();
        const differenceInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
        if (differenceInHours < 24) {
            return `${Math.round(differenceInHours)} hours ago`;
        }
    
        const differenceInDays = differenceInHours / 24;
        if (differenceInDays < 7) {
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            //return `${Math.round(differenceInDays)} days ago at ${timeString}`;
            return `${Math.round(differenceInDays)} days ago`;
        }
    
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    }; 


    const newsStatus = useAppSelector(selectNewsStatus);
    if(newsStatus === 'loading' || !selectedArticle){
        return(
            <Loading />
        )
    }
    return (
        <div className="flex flex-col lg:max-w-[750px] w-full rounded-[20px] bg-white border-solid border border-gray-100 overflow-hidden p-2">
            <div className="relative rounded-[20px] max-h-[300px] overflow-hidden">
                <img src={selectedArticle?.media[0]} alt="News" className="block object-cover rounded-[20px] max-h-[300px] w-full" />
                <h2 className="hidden xs:block absolute bottom-0 left-0 right-0 block md:block text-lg sm:text-xl font-bold text-white p-4 bg-gradient-to-t from-black to-transparent">
                    {selectedArticle?.title}
                </h2>
            </div>
            <h2 className="block xs:hidden text-lg font-bold text-black pt-4 pb-2">
                {selectedArticle?.title}
            </h2>
            <div className="flex items-center gap-2 mt-4 mb-2 ml-4 hidden xs:flex xs:w-fit w-full">
                <img className="w-12 h-12 rounded-full" src={selectedArticle?.fromImage} alt="news creator image"/>
                <div className="flex-1 font-medium leading-5 flex flex-row xs:flex-col justify-between items-center xs:justify-start xs:items-start ">
                    <div>{selectedArticle?.from}</div>
                    <div className="text-sm text-gray-500">{formatDate(selectedArticle?.publishedDate)}</div>
                </div>
            </div>
            <div className="flex flex-col justify-start p-2 px-1 sm:px-4">
                <p className="text-sm sm:text-md whitespace-pre-wrap">{selectedArticle?.content}</p>
                <div className="flex items-center gap-2 mt-4 mb-2 block xs:hidden xs:w-fit w-full pr-4">
                    <img className="w-12 h-12 rounded-full" src={selectedArticle?.fromImage} alt="news creator image"/>
                    <div className="flex-1 font-medium leading-5 flex flex-row xs:flex-col justify-between items-center xs:justify-start xs:items-start ">
                        <div>{selectedArticle?.from}</div>
                        <div className="text-sm text-gray-500">{formatDate(selectedArticle?.publishedDate)}</div>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap my-5'>
                    <span className='font-bold mr-2'>Tags: </span>
                    {selectedArticle?.keywords.map((tag, index) => (
                        <span key={index} className="inline-block bg-neutral-100 rounded-full px-3 py-1 text-xs sm:text-sm font-normal text-neutral-400">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}


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

export default news;