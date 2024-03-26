import React from 'react'

type Props = {}

const NewsPlaceholder = (props: Props) => {
    return (
        <>
            <div className="animate-pulse flex flex-col md:flex-row w-full rounded-[20px] bg-white border-solid border border-gray-100 overflow-hidden mb-2 md:mb-4 cursor-pointer">
                <div className="flex flex-col justify-start w-full">
                    <div className="flex items-center justify-center w-full object-cover rounded-t-[20px] h-[220px] sm:h-[280px] bg-gray-300">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                        </svg>
                    </div>
                    <div className='flex flex-col px-1 sm:px-5 mt-5'>
                        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
                        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[50%]"></div>
                    </div>
                    <div className='px-1 sm:px-5 flex items-center gap-2 mb-3 mt-1 xs:mt-4 mb-2 pr-3 sm:pr-0 flex xs:w-fit w-full'>
                        <div className="flex items-center gap-2 xs:w-fit w-full">
                            <div className='h-10 w-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full'></div>
                            <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-6 sm:mb-8 px-1 sm:px-5 mt-2'>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[50%]"></div>
                    </div>
                    <div className='mb-4 px-1 sm:px-5'>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[50%]"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsPlaceholder