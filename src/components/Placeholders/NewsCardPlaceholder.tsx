import React from 'react'

type Props = {}

const Placeholder = (props: Props) => {
  return (
    <>
        <div className="animate-pulse flex flex-col xs:flex-row lg:max-w-[750px] w-full rounded-[20px] bg-white border-solid border border-gray-100 overflow-hidden mb-2 md:mb-4 cursor-pointer">
            <div className="flex items-center justify-center xs:w-1/2 object-cover rounded-l-[20px] h-40 bg-gray-300">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                </svg>
            </div>
            <div className="flex flex-col justify-start p-2 px-1 py-4 xs:px-4 w-full">
                <div>
                    <div className="h-3 bg-gray-200 rounded-full w-full mb-3 block"></div>
                    <div className="h-3 bg-gray-200 rounded-full block w-[60%] mb-4"></div>
                    <div className="w-40 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className='flex flex-col xs:flex-row justify-between items-end mt-4 h-full flex-grow'>
                    <div className="flex items-center gap-2 xs:w-fit w-full">
                        <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
                        <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Placeholder