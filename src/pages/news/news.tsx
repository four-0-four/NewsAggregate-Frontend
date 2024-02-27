import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated } from '../../lib/features/user/slice';
import { fetchOneNewsArticle } from '../../lib/features/news/thunks';
import { NewsArticle, selectNewsStatus, selectSelectedArticle } from '../../lib/features/news/slice';
import NewsPlaceholder from '../../components/Placeholders/NewsPlaceholder';
import { useParams } from 'react-router-dom';

type NewsComponentProps = {};

const News: React.FC<NewsComponentProps> = ({}) => {
    const { newsID } = useParams<{ newsID: string }>();
    const dispatch = useAppDispatch(); // Use the typed dispatch hook
    const isAuthenticated = useAppSelector(selectIsAuthenticated); // Also using the typed selector hook

    useEffect(() => {
        if (newsID) {
            dispatch(fetchOneNewsArticle(newsID)); // This should now be correctly typed
        }
    }, [dispatch, newsID]);


    const selectedArticle = useAppSelector(selectSelectedArticle);
    const [imageSrc, setImageSrc] = useState<string>("");

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageSrc(selectedArticle?.media[0] || "/breaking_news.png");
        img.onerror = () => setImageSrc("/breaking_news.png"); // Fallback image on error
        img.src = selectedArticle?.media[0] || "";
    }, [selectedArticle?.media]);

    const formatDate = (dateString: string) => {
        // Assuming dateString is in UTC, parse it as such
        const date = new Date(dateString + 'Z'); // Add 'Z' to indicate UTC time
    
        // Format and return the date in the user's local timezone
        return date.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    


    const newsStatus = useAppSelector(selectNewsStatus);
    if(newsStatus === 'loading' || !selectedArticle){
        return(
            <div className={`mx-auto lg:ml-0 lg:mr-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full  ${isAuthenticated?"":"mx-auto"}`}>
                <NewsPlaceholder />
            </div>
        )
    }
    
    return (
        <div className={`flex flex-col mx-auto lg:ml-0 lg:mr-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full rounded-[20px] bg-white border-solid border border-gray-100 overflow-hidden p-2 pb-6 ${isAuthenticated?"":"mx-auto"}`}>
            <div className="relative rounded-[20px] max-h-[300px] overflow-hidden">
                <img src={imageSrc} alt="News" className="block object-cover object-center rounded-[20px] max-h-[300px] w-full" />
                <h2 className="hidden xs:block absolute bottom-0 left-0 right-0 block md:block text-lg sm:text-xl font-bold text-white p-4 pt-32"
                    style={{background: 'linear-gradient(to top, black, rgba(0,0,0,0) 100%)'}}>
                    {selectedArticle?.title}
                </h2>
            </div>
            <h2 className="block xs:hidden text-lg font-bold text-black pt-2 pb-2 px-1 sm:px-2 leading-snug sm:leading-normal mb-1">
                {selectedArticle?.title}
            </h2>
            <div className="px-1 sm:px-2  flex items-center gap-2 mt-1 mb-4 sm:mb-4 xs:mt-4 pr-3 sm:pr-0 xs:w-fit w-full">
                <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" src={selectedArticle?.fromImage} alt="news creator image"/>
                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start">
                    <p>{selectedArticle?.from}</p>
                    <p className="text-sm text-gray-500">{formatDate(selectedArticle?.publishedDate)}</p>
                </div>
            </div>
            <div className="px-1 sm:px-2 flex flex-col justify-start p-2 md:px-4">
                <p className="text-sm sm:text-md whitespace-pre-wrap">{selectedArticle?.content}</p>
                {selectedArticle?.keywords && selectedArticle?.keywords.length > 0 && (
                    <div className='flex gap-2 flex-wrap my-5'>
                        <span className='font-bold mr-2'>Tags: </span>
                        {selectedArticle?.keywords.map((tag, index) => (
                            <span key={index} className="inline-block bg-neutral-100 rounded-full px-3 py-1 text-xs sm:text-sm font-normal text-neutral-400">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default News;