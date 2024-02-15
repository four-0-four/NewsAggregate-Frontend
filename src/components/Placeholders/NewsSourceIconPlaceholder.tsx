import React from 'react'

type Props = {}

const NewsSourceIconPlaceholder = (props: Props) => {
  return (
    <>
        <div className="animate-pulse">
            <div className='bg-gray-200 h-14 w-14 p-1 sm:w-16 sm:h-16 rounded-full mb-2'></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-14 m-auto"></div>
        </div>
    </>
  )
}

export default NewsSourceIconPlaceholder