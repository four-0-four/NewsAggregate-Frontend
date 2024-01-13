import React from 'react'


type NewsComponentProps = {
    imageSrc: string;
    title: string;
    description: string;
};

const NewsCard: React.FC<NewsComponentProps> = ({ imageSrc, title, description }) => {
    return (
        <div className="flex w-full">
            <img src={imageSrc} alt="News" className="w-1/3 object-cover" />
            <div className="flex flex-col justify-start p-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default NewsCard