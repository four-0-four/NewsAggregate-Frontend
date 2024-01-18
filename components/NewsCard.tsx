import React from 'react';

type NewsComponentProps = {
    imageSrc: string;
    title: string;
    description: string;
    from: string;
    fromImage: string;
    date: Date;
    tags: string[];
};

const NewsCard: React.FC<NewsComponentProps> = ({ imageSrc, title, description, from, fromImage, date, tags }) => {
    // Function to format the date
    console.log(tags,typeof(tags))
    const formatDate = (date: Date) => {
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
        <div className="flex flex-col md:flex-row w-full rounded-[25px] bg-white border-solid border border-gray-100 overflow-hidden p-2 mb-4 cursor-pointer">
            <img src={imageSrc} alt="News" className="hidden md:block xs:w-1/3 object-cover rounded-[25px]" />
            <div className='flex flex-row md:flex-col items-center mb-4'>
                <img src={imageSrc} alt="News" className="block md:hidden xs:w-1/3 md:w-full object-cover rounded-[25px]" />
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
                    <div className="flex flex-wrap gap-2 xs:max-w-[300px] w-full justify-start xs:justify-end mt-4 sm:mt-0">
                        {tags.slice(0, 4).map((tag, index) => (
                            <span key={index} className="inline-block bg-neutral-100 rounded-full px-3 py-1 text-xs sm:text-sm font-normal text-neutral-400">{tag}</span>
                        ))}
                        {tags.length > 4 && (
                            <span className="inline-block bg-neutral-100 rounded-full px-3 py-1 text-xs sm:text-sm font-normal text-neutral-400">+{tags.length - 4} more tags</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;