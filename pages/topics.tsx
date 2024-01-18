import NewsCard from '@/components/NewsCard';
import { selectCategoryArticles, selectNewsCategories } from '@/lib/features/news/slice';
import { fetchVarietyTopicsNews } from '@/lib/features/news/thunks';
import { selectIsAuthenticated } from '@/lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react'

type Props = {}

const topics = (props: Props) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
        dispatch(fetchVarietyTopicsNews(0));
    }
  }, [dispatch, isAuthenticated]);



  const categories = useAppSelector(selectNewsCategories);
  const categoryArticles = useAppSelector(selectCategoryArticles);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6; // Number of items to show at a time

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < categories.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };
  
  return (
    <div>
      <div className="bg-white rounded-[25px] border-solid border border-gray-100 p-5 xl:p-7">
        <h1 className="text-xl font-bold mb-4">
          Explore a range of subjects to find your interest
        </h1>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-2 py-2 rounded-full text-2xl ${
              startIndex === 0 ? 'text-gray-300 cursor-default disable' : 'cursor-pointer text-black'
            }`}
            onClick={handlePrev}
          >
            &lt;
          </button>
          {categories.slice(startIndex, startIndex + itemsPerPage).map((category) => (
            <button
              key={category}
              className="w-[14%] bg-gray-100 text-gray-500 hover:bg-black hover:text-neutral-100 py-2 rounded-full"
            >
              {category}
            </button>
          ))}
          <button
          className={`px-2 py-2 rounded-full text-2xl ${
            startIndex + itemsPerPage >= categories.length ? 'text-gray-300 cursor-default disable' : 'cursor-pointer text-black'
          }`}
          onClick={handleNext}
        >
          &gt;
        </button>
        </div>
      </div>
      <div className='mb-5'>
        {Object.keys(categoryArticles).map(category => (
          <div className="mt-20" key={category}>
            <div className='my-6 capitalize flex'>
              <h2 className="text-3xl font-bold inline-block">{category}</h2>
              <button className='text-sm text-black bg-primary ml-4 rounded-[25px] p-1 px-3 hover:bg-amber-400'>+ Follow Topic</button>
            </div>
            {categoryArticles[category].map(newsCard => (
              <NewsCard
                key={newsCard.id}
                imageSrc={newsCard.media[0]}
                title={newsCard.title}
                description={newsCard.content}
                from={newsCard.from}
                fromImage={newsCard.fromImage}
                date={new Date(newsCard.publishedDate)}
                tags={newsCard.keywords}
              />
            ))}
            <div className="flex justify-start">
              <div className="text-2xl text-primary underline flex items-center cursor-pointer hover:text-amber-400">
                <h3>View all</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default topics