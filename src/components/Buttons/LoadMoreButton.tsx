import React from 'react'

type Props = {
    HandleLoadMore: () => void;
}

const LoadMoreButton: React.FC<Props> = ({ HandleLoadMore }) => {
  return (
    <div className="flex lg:max-w-[750px] w-full justify-center mt-6">
        <button onClick={HandleLoadMore} className="my-1 mb-0 bg-gray-200 rounded-full text-gray-400 px-14 py-2 hover:bg-gray-300 hover:text-gray-500">
        <h3>Load More</h3>
        </button>
    </div>
  )
}

export default LoadMoreButton