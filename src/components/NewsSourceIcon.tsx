import React from 'react'

type Props = {
    name: string,
    logo: string,
    action: (source: string) => void
    actionType: string
}

const NewsSourceIcon = (props: Props) => {
  return (
    <div className='flex flex-col items-center'>
        <div className='relative'>
            <img src={props.logo} alt={props.name} className='h-14 w-14 p-1 sm:w-16 sm:h-16 bg-white rounded-full border border-black' />
            {props.actionType.toLowerCase() === 'remove' && (
                <button onClick={()=>props.action(props.name)} className='absolute top-[0rem] right-[-0.2rem] text-sm rounded-full bg-black text-white h-5 w-5 sm:h-5 sm:w-5 flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
            {props.actionType.toLowerCase() === 'add' && (
                <button onClick={()=>props.action(props.name)} className='absolute top-[0rem] right-[-0.2rem] text-md rounded-full bg-primary text-black h-5 w-5 sm:h-5 sm:w-5 flex items-center justify-center'>
                    <p className='text-lg'>+</p>
                </button>
            )}
        </div>
        <p className='mt-2 max-w-[70px] text-center text-xs font-semibold leading-3 flex flex-col justify-start items-start'>{props.name}</p>
    </div>
  )
}

export default NewsSourceIcon