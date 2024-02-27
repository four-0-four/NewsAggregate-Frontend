import React from 'react'

type Props = {
    HandleLoadMore: () => void;
}

const LoadMoreButton: React.FC<Props> = ({ HandleLoadMore }) => {
  return (
    <div className="flex lg:max-w-[750px] w-full justify-center mt-8">
        <button onClick={HandleLoadMore} className="my-1 mb-3 bg-gray-100 rounded-full text-gray-300 px-14 py-2 hover:bg-gray-200 hover:text-gray-400">
        <h3>Load More</h3>
        </button>
    </div>
  )
}

export default LoadMoreButton