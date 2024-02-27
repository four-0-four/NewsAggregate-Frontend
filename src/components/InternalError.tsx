import React from 'react'

type Props = {}

const InternalError = (props: Props) => {
  return (
    <div className='flex flex-col items-center'>
        <img src={"/internal_error.png"} className='max-w-[90%] sm:max-w-[70%] md:max-w-[50%]'/>
        <h1 className='max-w-[500px] xs:px-10 px-2'>
            Oop! something happened on our side :( we are very sorry! Please report this to us with a screenshot as soon as possible so we can fix it
        </h1>
        <a href="/contactUs" className='mt-5 xs:mt-10 border border-1 border-primary rounded-full text-primary px-3 py-1 hover:bg-primary hover:text-white'>Contact Us</a>
    </div>
  )
}

export default InternalError