import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../lib/hooks';
import { addNewsToBookmark, getAllBookmarksForUser, removeNewsFromBookmark } from '../lib/features/news/thunks';
import { addBookmark, removeBookmark } from '../lib/features/news/slice';

type NewsComponentProps = {
    id: number;
    imageSrc: string;
    title: string;
    shortSummary: string;
    from: string;
    fromImage: string;
    date: string;
    tags: string[];
    isBookmarked?: boolean | null;
};

const NewsCard: React.FC<NewsComponentProps> = ({ id, imageSrc, title, shortSummary, from, fromImage, date, tags, isBookmarked=false }) => {
    const dispatch = useAppDispatch();
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


    const [image, setImage] = useState<string>("");

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImage(imageSrc || "/breaking_news.png");
        img.onerror = () => setImage("/breaking_news.png"); // Fallback image on error
        img.src = imageSrc || "";
    }, [imageSrc]);

    const bookmarkNews = async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent click event from reaching the <a> tag
        event.preventDefault();
        await dispatch(addBookmark(id));
        await dispatch(addNewsToBookmark(id));
        await dispatch(getAllBookmarksForUser());
    }

    const unbookmarkNews = async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent click event from reaching the <a> tag
        event.preventDefault();
        await dispatch(removeBookmark(id));
        await dispatch(removeNewsFromBookmark(id));
        await dispatch(getAllBookmarksForUser());
    }

    const navigate = useNavigate();
        
    return (
        <a className="flex flex-col sm:flex-row lg:max-w-[750px] w-full rounded-[20px] bg-white border-solid border border-gray-100 overflow-hidden mb-2 md:mb-4 cursor-pointer"
        href={'/news/' + id}>
            <div className="block w-full sm:min-w-[33%] sm:w-1/3 object-cover object-top rounded-l-[20px] h-100% min-h-[200px]" style={{backgroundImage:`url(${image})`, backgroundSize:'cover'}}></div>
            <div className="flex flex-col justify-between items-between p-2 py-3 px-1 xs:px-4 w-full">
                <div>
                    <h2 className="block text-lg mb-1 !leading-6">{title}</h2>
                    <div className="text-sm md:text-md text-gray-400 mb-3">{formatDate(date)}</div>
                    <div className='text-md mb-3'>{shortSummary}</div>
                </div>
                <div className='flex flex-row items-center justify-between mt-1'>
                    <div className="flex items-center gap-2 xs:w-fit w-full">
                        <img className="w-8 h-8 rounded-full" src={fromImage} alt="news creator image"/>
                        <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                            <div>{from}</div>
                        </div>
                    </div>
                    {isBookmarked ?
                    <button className='border border-white rounded-full bg-gray-100 hover:bg-amber-200 flex items-center justify-center p-2' title="unbookmark news" onClick={(event) => unbookmarkNews(event)}>
                        <UnBookmarkedIcon />
                    </button>
                    :
                    <button className='border border-white rounded-full bg-gray-100 hover:bg-amber-200 flex items-center justify-center p-2' title="bookmark news" onClick={(event) => bookmarkNews(event)}>
                        <BookmarkedIcon />
                    </button>
                    }
                </div>
            </div>
        </a>
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

export default NewsCard;