import React from 'react';

type NewsComponentProps = {
    imageSrc?: string;
    title?: string;
    description?: string;
    from?: string;
    fromImage?: string;
    date?: Date;
    tags?: string[];
};

const news: React.FC<NewsComponentProps> = ({
    imageSrc = "https://www.theglobeandmail.com/resizer/v2/CTKPEANIJBAHVPGGHJCK2PPPVU.jpg?auth=42539e44cbb52811507dfe779a9e93536ce7982f5213f61a1fc31cff2bdd9c35&width=600&quality=80",
    title = "Decisive Victory: Progressive Alliance Wins the General Elections",
    description = "Elections 2024: Read the latest Elections news and updates on The Economic Times. Get updates on General Elections, Lok Sabha elections, assembly elections, and more. Stay informed about the candidates, their campaigns, polling data, and everything you need to know about the upcoming national elections. From in-depth analysis to expert opinions, get comprehensive coverage of the political landscape. Explore detailed reports on electoral strategies, party manifestos, and the impact of recent policy changes. Understand the implications of election outcomes on domestic and international politics. With exclusive interviews, live updates, and breaking news, stay ahead of the curve in understanding the dynamics of democracy. This year's elections are expected to be a turning point in shaping the future direction of the country. Don't miss out on any developments in this pivotal moment in history.",
    from = "BBC",
    fromImage = "https://yt3.googleusercontent.com/y_esGAQOhX4rTpWvrALErAJlFbm_2TIVrvcVfcZny7TuA8dJZgOQcC6KRfd_J5hljFe-foYXj9U=s900-c-k-c0x00ffffff-no-rj",
    date = new Date('2024-01-07T14:00:00'),
    tags = ["Politics", "Elections", "India", "International", "Economy", "Environment", "Technology", "Health", "Education", "Sports"]
}) => {
    // Function to format the date
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
        <div className="flex flex-col lg:max-w-[750px] w-full rounded-[25px] bg-white border-solid border border-gray-100 overflow-hidden p-2">
            <div className="relative rounded-[25px] max-h-[300px] overflow-hidden">
                <img src={imageSrc} alt="News" className="block object-cover rounded-[25px] max-h-[300px] w-full" />
                <h2 className="hidden xs:block absolute bottom-0 left-0 right-0 block md:block text-lg sm:text-xl font-bold text-white p-4 bg-gradient-to-t from-black to-transparent">
                    {title}
                </h2>
            </div>
            <h2 className="block xs:hidden text-lg font-bold text-black pt-4 pb-2">
                {title}
            </h2>
            <div className="flex items-center gap-2 mt-4 mb-2 ml-4 hidden xs:flex xs:w-fit w-full">
                <img className="w-12 h-12 rounded-full" src={fromImage} alt="news creator image"/>
                <div className="flex-1 font-medium leading-5 flex flex-row xs:flex-col justify-between items-center xs:justify-start xs:items-start ">
                    <div>{from}</div>
                    <div className="text-sm text-gray-500">{formatDate(date)}</div>
                </div>
            </div>
            <div className="flex flex-col justify-start p-2 px-1 sm:px-4">
                <p className="text-sm sm:text-md">{description}</p>
                <div className="flex items-center gap-2 mt-4 mb-2 block xs:hidden xs:w-fit w-full pr-4">
                    <img className="w-12 h-12 rounded-full" src={fromImage} alt="news creator image"/>
                    <div className="flex-1 font-medium leading-5 flex flex-row xs:flex-col justify-between items-center xs:justify-start xs:items-start ">
                        <div>{from}</div>
                        <div className="text-sm text-gray-500">{formatDate(date)}</div>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap my-5'>
                    <span className='font-bold mr-2'>Tags: </span>
                    {tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-neutral-100 rounded-full px-3 py-1 text-xs sm:text-sm font-normal text-neutral-400">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default news;