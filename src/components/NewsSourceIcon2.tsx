import React from 'react'

type Props = {
    name: string,
    logo: string,
}

const NewsSourceIcon2 = (props: Props) => {
  return (
    <div className='flex flex-col items-center'>
        <div className='relative'>
            <img src={props.logo} alt={props.name} className='h-16 w-16 p-1 lg:w-20 lg:h-20 bg-white rounded-full border border-black' />
        </div>
        <p className='mt-2 max-w-[70px] text-center text-xs font-semibold leading-3 flex flex-col justify-start items-start'>{props.name}</p>
    </div>
  )
}

export default NewsSourceIcon2