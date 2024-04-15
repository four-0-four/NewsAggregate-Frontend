import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectIsAuthenticated } from '../../lib/features/user/slice';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    return (
        <div className=''>
            <div className='z-20 relative min-h-[5px] bg-gray-100'></div>
            <div className='bg-black z-0 mt-[-4px]'>
                <div className="bg-gray-100 min-h-[50px] w-full" style={{ clipPath: "polygon(100% 0, 100% 100%, 28% 30%, 0 100%, 0% 0%)" }}></div>
            </div>
            <footer className="bg-black p-5 py-3 mt-[-1px]">
                <div className="grid md:grid-cols-[50%,50%] grid-cols-1 gap-4 max-w-[1000px] mx-auto border-b border-gray-600">
                    <div>
                        <a className='flex md:justify-start items-center flex-grow md:flex-grow-0 cursor-pointer sm:ml-1' href="/">
                            <img src={'/logo_transparent.png'} alt="Farabix" className="w-12" />
                            <p className="flex text-xl xs:text-2xl text-primary uppercase">Farabix</p>
                        </a>
                        <p className='text-gray-300 text-sm sm:px-2 py-3 max-w-[350px]'>
                            Our goal is to customize your news experience: Stay informed, stay engaged, stay in control
                        </p>
                        <div className='flex flex-row flex-wrap gap-2 sm:px-2 py-3 md:mb-5'>
                            <a href="https://www.instagram.com/farabixinc/" className="flex items-center gap-2 mb-1 block w-fit bg-white rounded-[20px]" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" className="w-8 h-8 rounded-full text-black fill-black p-[5px]">
                                    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                                </svg>
                            </a>
                            <a href="https://twitter.com/farabixinc" className="flex items-center gap-2 mb-1 block w-fit bg-white rounded-[20px]" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 462.799" className="w-8 h-8 rounded-full text-primary fill-black p-[5px]">
                                    <path fill-rule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/>
                                </svg>
                            </a>
                            <a href="mailto:admin@farabix.com" className="flex items-center gap-2 mb-1 block w-fit bg-white rounded-[20px]">
                                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  className="w-8 h-8 rounded-full text-black p-[5px]">
                                    <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="grid xs:grid-cols-[33%,33%,33%] lg:grid-cols-[30%,30%,40%] grid-cols-1 gap-6 xs:gap-1 lg:gap-8 mx-auto w-full md:max-w-[400px] md:pt-5 pb-5 md:pb-0">
                        <div>
                            <h2 className='text-gray-200'>Company</h2>
                            <div className='flex flex-col gap-2 mt-2'>
                                {isAuthenticated && (
                                <a href="/" className='text-sm text-gray-400 hover:text-primary'>
                                    Home
                                </a>  
                                )}
                                <a href="/landing" className='text-sm text-gray-400 hover:text-primary'>Landing</a>
                                <a href="/landing/contactUs" className='text-sm text-gray-400 hover:text-primary'>Contact Us</a>
                                <a href="/landing/newsSources" className='text-sm text-gray-400 hover:text-primary'>News Sources</a>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-gray-200'>Legal</h2>
                            <div className='flex flex-col gap-2 mt-2'>
                                <a href="/policy/PrivacyPolicy" className='text-sm text-gray-400 hover:text-primary'>Privacy Policy</a>
                                <a href="/policy/TermsOfService" className='text-sm text-gray-400 hover:text-primary'>Terms of Service</a>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 md:mr-5 mt-5 sm:mt-0'>
                            <a href="/auth/Register" className='text-md px-2 md:px-2 py-1 text-black rounded-full capitalize bg-primary text-center border-2 border-primary'>
                                Sign up
                            </a>
                            <a href='/auth/Login' className='text-md px-2 md:px-2 py-1 text-primary border-2 border-primary rounded-full capitalize bg-black hover:bg-opacity-80 text-center'>
                                Login
                            </a>
                        </div>
                    </div>
                </div>
                <div className='max-w-[1200px] mx-auto flex flex-row items-center justify-center pt-4 pb-2'>
                    <h1 className='hidden xs:block text-gray-400 text-sm'>All rights reserved &#169;. {new Date().getFullYear()}</h1>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
