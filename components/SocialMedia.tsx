import Link from 'next/link'
import React from 'react'

type Props = {}

const SocialMedia = (props: Props) => {
  return (
    <div className='mt-4 xl:mt-6 w-full px-4 sm:w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl bg-white p-6 rounded-[20px] border border-gray-100 mb-12 lg:mb-0'>
        <h1 className={`text-lg sm:text-xl md:text-2xl font-bold text-left uppercase pb-4 font-light`}>
        Other Ways to Reach Us
        </h1>
        <div className='flex flex-row flex-wrap gap-2'>
            <Link href="https://www.instagram.com/farabixinc/" className="flex items-center gap-2 mb-1 block w-fit pr-4 bg-gray-100 p-2 rounded-[20px]" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" className="mr-1 w-10 h-10 rounded-full text-primary border-2 border-primary fill-primary p-[6px]">
                    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                </svg>
                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                    <h1>Instagram</h1>
                    <h3 className="text-sm text-gray-500">@farabixinc</h3>
                </div>
            </Link>
            <Link href="https://twitter.com/farabixinc" className="flex items-center gap-2 mb-1 block w-fit pr-4 bg-gray-100 p-2 rounded-[20px]" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 462.799" className="w-10 h-10 rounded-full text-primary border-2 border-primary fill-primary p-[6px] mr-1">
                    <path fill-rule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/>
                </svg>
                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                    <h1>X (Twitter)</h1>
                    <h3 className="text-sm text-gray-500">@farabixinc</h3>
                </div>
            </Link>
            <Link href="mailto:admin@farabix.com" className="flex items-center gap-2 mb-1 block w-fit pr-4 bg-gray-100 p-2 rounded-[20px]">
                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  className="w-10 h-10 rounded-full text-primary border-2 border-primary p-[6px] mr-1">
                    <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="#F9CF45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                    <h1>Email</h1>
                    <h3 className="text-sm text-gray-500">farabix@support.com</h3>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default SocialMedia