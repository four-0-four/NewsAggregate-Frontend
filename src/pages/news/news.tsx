import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated } from '../../lib/features/user/slice';
import { addNewsToBookmark, fetchOneNewsArticle, fetchOneNewsArticleAuthenticated, removeNewsFromBookmark } from '../../lib/features/news/thunks';
import { NewsArticle, addBookmark, removeBookmark, selectNewsStatus, selectSelectedArticle } from '../../lib/features/news/slice';
import NewsPlaceholder from '../../components/Placeholders/NewsPlaceholder';
import { useParams } from 'react-router-dom';

type NewsComponentProps = {};

const News: React.FC<NewsComponentProps> = ({}) => {
    const { newsID } = useParams<{ newsID: string }>();
    const dispatch = useAppDispatch(); // Use the typed dispatch hook
    const isAuthenticated = useAppSelector(selectIsAuthenticated); // Also using the typed selector hook

    useEffect(() => {
        if (newsID) {
            if(isAuthenticated){
                dispatch(fetchOneNewsArticleAuthenticated(newsID)); // This should now be correctly typed
            }else{
                dispatch(fetchOneNewsArticle(newsID)); // This should now be correctly typed
            }
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
    
    const bookmarkNews = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent click event from reaching the <a> tag
        const id = isNaN(Number(newsID)) ? null : Number(newsID);
        if (id === null) return;
        if (!isNaN(id)) {
            dispatch(addBookmark(id)); // Dispatch the addBookmark action with the news article's ID
        }
        dispatch(addNewsToBookmark(id));
    }

    const unbookmarkNews = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent click event from reaching the <a> tag
        const id = isNaN(Number(newsID)) ? null : Number(newsID);
        if (id === null) return;
        if (!isNaN(id)) {
            dispatch(removeBookmark(id)); // Dispatch the removeBookmark action with the news article's ID
        }
        dispatch(removeNewsFromBookmark(id));
    }


    const newsStatus = useAppSelector(selectNewsStatus);
    console.log(newsStatus)
    if(newsStatus === 'loading' || !selectedArticle){
        return(
            <div className={`mx-auto lg:ml-0 lg:mr-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full  ${isAuthenticated?"":"mx-auto"}`}>
                <NewsPlaceholder />
            </div>
        )
    }
    
    return (
        <div className={`flex flex-col md:max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full rounded-[20px] bg-white border-solid border border-gray-100 overflow-hidden p-2 pb-6 ${isAuthenticated?"lg:ml-0 lg:mr-auto":"mx-auto"} `}>
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
            <div className='flex flex-row items-center justify-between mt-1 mb-4 sm:mb-4 xs:mt-4 md:pr-5 sm:pr-0 w-full px-1 sm:px-2'>
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" src={selectedArticle?.fromImage} alt="news creator image"/>
                    <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start">
                        <p>{selectedArticle?.from}</p>
                        <p className="text-sm text-gray-500">{formatDate(selectedArticle?.publishedDate)}</p>
                    </div>
                </div>
                {selectedArticle?.isBookmarked != null && (
                    <>
                    {selectedArticle?.isBookmarked ?
                        <button className='border border-white rounded-full bg-gray-100 hover:bg-amber-200 flex items-center justify-center p-2' title="unbookmark news" onClick={(event) => unbookmarkNews(event)}>
                            <UnBookmarkedIcon />
                        </button>
                        :
                        <button className='border border-white rounded-full bg-gray-100 hover:bg-amber-200 flex items-center justify-center p-2' title="bookmark news" onClick={(event) => bookmarkNews(event)}>
                            <BookmarkedIcon />
                        </button>
                    }
                    </>
                )}
            </div>
            <div className="px-1 sm:px-2 flex flex-col justify-start p-2 md:px-4">
                {selectedArticle?.longSummary && (
                    <p className="text-sm sm:text-md whitespace-pre-wrap text-gray-400 mb-1">(Summarized by Farabix)</p>
                )}
                <p className="text-sm sm:text-md whitespace-pre-wrap">{selectedArticle?.longSummary}</p>
                {selectedArticle?.keywords && selectedArticle?.keywords.length > 0 && (
                    <div className='flex gap-2 flex-wrap my-5'>
                        <span className='font-bold mr-2'>Tags: </span>
                        {selectedArticle?.keywords.map((tag, index) => (
                            <span key={index} className="inline-block bg-neutral-100 rounded-full px-3 py-1 text-xs sm:text-sm font-normal text-neutral-400">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-end mr-5 mt-5">
                <a className="text-md text-gray-600 flex items-center cursor-pointer hover:text-gray-600 hover:bg-amber-200 bg-gray-100 rounded-[10px] pl-3 pr-1 py-1"
                href={selectedArticle?.externalLink} target="_blank" rel="noopener noreferrer">
                    <h3>Read More</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-1 w-6 h-6 p-1 rounded-full">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

const BookmarkedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 inline-block">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>
)

const UnBookmarkedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 inline-block">
        <path stroke-linecap="round" stroke-linejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5" />
    </svg>
)

export default News;