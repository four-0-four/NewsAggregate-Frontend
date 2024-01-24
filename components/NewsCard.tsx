import router from 'next/router';
import React from 'react';

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
    // Function to format the date
    const formatDate = (dateString:string) => {
        const date = new Date(dateString); // Convert string to Date object
    
        const now = new Date();
        const utcNow = new Date(now.toISOString());
        const utcDate = new Date(date.toISOString());
    
        const differenceInSeconds = (utcNow.getTime() - utcDate.getTime()) / 1000;
    
        return date.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
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

    return (
        <div className="flex flex-col md:flex-row w-full rounded-[25px] bg-white border-solid border border-gray-100 overflow-hidden p-2 mb-2 md:mb-4 cursor-pointer"
        onClick={() => router.push('/news/' + id)}>
            <img src={imageSrc} alt="News" className="hidden md:block xs:w-1/3 object-cover rounded-[25px]" />
            <div className='flex flex-row md:flex-col items-center sm:mb-0 md:mb-4'>
                <img src={imageSrc} alt="News" className="block md:hidden xs:w-1/3 md:w-full h-full object-cover rounded-[25px]" />
                <h2 className="hidden xs:block md:hidden text-lg sm:text-xl font-bold mb-2 p-5">{title}</h2>
            </div>
            <div className="flex flex-col justify-start p-2 px-1 sm:px-4 w-full">
                <div>
                    <h2 className="block xs:hidden md:block text-lg sm:text-xl font-bold mb-2">{title}</h2>
                    <p className="text-sm sm:text-md">{truncateDescription(description)}</p>
                </div>
                <div className='flex flex-col xs:flex-row justify-between items-end mt-4 h-full flex-grow'>
                    <div className="flex items-center gap-2 xs:w-fit w-full">
                        <img className="w-10 h-10 rounded-full" src={fromImage} alt="news creator image"/>
                        <div className="flex-1 font-medium leading-5 flex flex-row xs:flex-col justify-between items-center xs:justify-start xs:items-start ">
                            <div>{from}</div>
                            <div className="text-sm text-gray-500">{formatDate(date)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;