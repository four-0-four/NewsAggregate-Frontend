import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type NewsComponentProps = {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    from: string;
    fromImage: string;
    date: string;
    tags: string[];
};

const NewsCard: React.FC<NewsComponentProps> = ({ id, imageSrc, title, description, from, fromImage, date, tags }) => {
    
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
    


    const truncateDescription = (description:string) => {
        if (description.length <= 300) return description;
        
        let truncated = description.substr(0, 180);
        const lastSpaceIndex = truncated.lastIndexOf(" ");
        if (lastSpaceIndex > 0) {
            truncated = truncated.substr(0, lastSpaceIndex);
        }
        return truncated + "... (read more)"
    };

    const [image, setImage] = useState<string>("");

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImage(imageSrc || "/breaking_news.png");
        img.onerror = () => setImage("/breaking_news.png"); // Fallback image on error
        img.src = imageSrc || "";
    }, [imageSrc]);

    const navigate = useNavigate();
        
    return (
        <div className="flex flex-col xs:flex-row lg:max-w-[750px] w-full rounded-[20px] bg-white border-solid border border-gray-100 overflow-hidden p-2 mb-2 md:mb-4 cursor-pointer"
        onClick={() => navigate('/news/' + id)}>
            <img src={image} alt="News" className="block w-full xs:min-w-[33%] xs:w-1/3 object-cover object-top rounded-[20px] max-h-44 min-h-100%" />
            <div className="flex flex-col justify-between items-between p-2 px-1 xs:px-4 w-full">
                <div>
                    <h2 className="block text-lg sm:text-xl mb-2 !leading-7">{title}</h2>
                    <div className="text-sm md:text-md text-gray-400 mb-3">{formatDate(date)}</div>
                </div>
                <div className='flex flex-col items-start justify-end mt-1'>
                    <div className="flex items-center gap-2 xs:w-fit w-full">
                        <img className="w-10 h-10 rounded-full" src={fromImage} alt="news creator image"/>
                        <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                            <div>{from}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;