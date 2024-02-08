// pages/landing.tsx

import Accordion from '../components/Accordion';
import ContactUsForm from '../components/Forms/ContactUsForm';
import { landingIllustration, LikeIcon, QuickIcon, InterestIcon } from '../util/illustrations';
import Link from 'next/link';
import React from 'react';


const LandingPage: React.FC = () => {
  return (
    <div>
        {/* Section 1 */}
        <section className="flex flex-col sm:flex-row justify-between items-center py-8 max-w-[1200px] mx-auto px-4 xs:px-10 pt-24 md:pt-8">
            <div className="w-full sm:w-3/5 md:w-3/5 mb-4  md:pt-10 lg:pt-0">
                <h1 className="text-3xl xl:text-5xl font-bold mb-4 text-left lg:!leading-snug">Your Trusted Source for Aggregated and Independent News</h1>
                <h3 className='lg:my-8 lg:mb-9 mb-4 text-sm md:text-md lg:text-lg xl:text-2xl xl:!leading-normal'>Customize your news experience: stay informed, stay engaged, stay in control</h3>
                <button className="bg-primary text-black text-sm md:text-md lg:text-lg xl:text-xl py-2 px-6 lg:px-12 md:px-10 rounded-[20px] uppercase mt-4">
                    Register <span className='xl:text-2xl'>&rarr;</span>
                </button>
            </div>
            <div className="sm:w-2/5 md:w-3/5">
                {landingIllustration()}
            </div>
        </section>

        {/* Section 2 */}
        <section className="py-4  bg-neutral-100 mb-10 md:mb-20">
            <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 xl:gap-x-20 my-2 sm:my-6 md:my-12  max-w-[1200px] mx-auto">
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/reuters.png" alt="reuters" className="w-1/6 h-auto" />
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/bbc.png" alt="bbc" className="lg:h-8 sm:h-4 h-2 w-auto" />
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/espn.png" alt="espn" className="w-auto sm:h-4 h-2 lg:h-8" />
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/theguardian.png" alt="theguardian" className="max-w-[16%] lg:w-auto lg:h-10" />
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/aljazeera.png" alt="aljazeera" className="w-[14%] lg:w-1/6 h-auto" />
            </div>
        </section>

        <div className="grid lg:grid-cols-[50%,50%] md:grid-cols-1 gap-4 mb-16 md:mb-20 max-w-[1200px] mx-auto px-4 xs:px-10">
            <div className="order-1 md:order-1 xs:p-5">
                <h3 className='xl:text-lg mb-2'>All in One Place</h3>
                <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold mb-4 text-left xl:!leading-normal md:!leading-snug'>
                    Explore Global News From Top & Trusted Sources
                </h1>
                <div className='mt-10'>
                    <div className="flex items-start gap-2 xs:w-fit w-full mb-10">
                        <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center mr-3">
                            {QuickIcon()}
                        </div>
                        <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                            <h3 className='text-lg font-bold mb-2'>
                                Quick and Convenient
                            </h3>
                            <div className="text-sm text-gray-500">
                                Effortlessly stay updated with real-time news feeds tailored to fit your busy lifestyle, and always just a click away    
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 xs:w-fit w-full">
                        <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center mr-3">
                            {InterestIcon()}
                        </div>
                        <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                            <h3 className='text-lg font-bold mb-2'>
                                Choose Your Own Interest
                            </h3>
                            <div className="text-sm text-gray-500">
                                Personalize your news feed by selecting topics you care about, from politics to technology, for a more relevant reading experience    
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <div className="order-2 md:order-2 flex items-center justify-center relative mt-10">
                <div className='rounded-[15px] bg-yellow-100 absolute right-[15%] top-[0%] w-[300px] h-[300px] z-0 blur-3xl'></div>
                <div className='max-w-[400px] shadow-xl rounded-[15px] p-2 z-0 bg-white'>
                    <img src={"/election_landing.png"} alt="Election Landing" className='w-full'/> 
                    <div className='flex justify-between my-3 text-lg px-2'>
                        <h3 className='font-bold'>Decisive Victory</h3>
                        {LikeIcon()}
                    </div>
                    <p className='px-2 text-sm text-gray-400 leading-4'>
                        Elections 2024: Read the latest Elections news and updates on The Economic Times. Get updates on General Elections, Lok Sabha elections, assembly elections...
                    </p>
                    <p className='px-2 mt-4 text-sm text-gray-500 mb-3'>
                        1 day ago | by Robbin joseph
                    </p>
                </div>
            </div>
        </div>


        <div className='bg-neutral-100 text-center p-5 py-10 sm:py-16'>
            <div className='max-w-[1200px] mx-auto'>
                <div>
                    <h1 className='font-bold uppercase text-xl xs:text-2xl my-6 mt-3'>Frequently Asked Questions</h1>
                    <h3 className='md:text-xl text-sm xs:text-md max-w-[500px] md:max-w-[700px] m-auto text-gray-400'>We are alway here to provide full support and clear any doubts that you might have</h3>
                </div>
                <div className='flex flex-col lg:flex-row gap-x-8 sm:mt-16 mt-10 items-start'>
                    <div className='grid grid-cols-1 gap-y-4 w-full lg:w-1/2'>
                        <Accordion question="How does this website ensure the reliability of news sources?" answer="We meticulously curate our news from reputable and established global sources, ensuring the information you receive is accurate and trustworthy."/>
                        <Accordion question="Can I access news from different countries? " answer="Yes, our platform offers news from around the world, giving you a global perspective on current events."/>
                        <Accordion question="Can I share articles I find interesting with my friends or on social media?" answer="Absolutely! Our platform enables easy sharing of articles across various social media platforms and through direct messaging, encouraging informed discussions."/>
                        <Accordion question="Will my personal data and reading preferences be protected and private?" answer="We prioritize user privacy and data protection. Your reading preferences and personal data are securely stored and never shared without consent."/>
                    </div>
                    <div className='grid grid-cols-1 gap-y-4 w-full lg:w-1/2'>
                        <Accordion question="How are the news stories tailored to my specific interests on the website?" answer="Our platform empowers you to create a personalized news feed. By adding topics you're interested in, we ensure that only these subjects are highlighted in your news overview, aligning perfectly with your preferences."/>
                        <Accordion question="Are there any costs involved in signing up for this news service?" answer="Currently, all features of our basic news aggregation service are available for free, giving you access to a wide range of trusted news sources. For content from premium and paid news sources, a small monthly fee is required to unlock these additional, high-quality resources."/>
                        <Accordion question="How frequently is the news content updated on the website?" answer="Our news feed is updated continuously, 24/7, ensuring that you always have access to the latest news as it happens."/>
                    </div>
                </div>
            </div>
        </div>

        <div className='sm:w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl m-auto my-10 md:px-10 px-4'>
            <h1 className='uppercase font-bold text-2xl py-4 border-b text-center'>Contact us</h1>
            <ContactUsForm />
        </div>

        <footer className="bg-black p-5 py-3">
            <div className='max-w-[1200px] mx-auto flex flex-row items-center justify-end xs:justify-between'>
                <h1 className='hidden xs:block text-gray-400 text-sm'>@2024 Farabix Inc, All rights reserved</h1>
                <div className='flex flex-row flex-wrap gap-2'>
                    <Link href="https://www.instagram.com/farabixinc/" className="flex items-center gap-2 mb-1 block w-fit bg-white rounded-[20px]" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" className="w-8 h-8 rounded-full text-black fill-black p-[5px]">
                            <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                        </svg>
                    </Link>
                    <Link href="https://twitter.com/farabixinc" className="flex items-center gap-2 mb-1 block w-fit bg-white rounded-[20px]" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 462.799" className="w-8 h-8 rounded-full text-primary fill-black p-[5px]">
                            <path fill-rule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/>
                        </svg>
                    </Link>
                    <Link href="mailto:admin@farabix.com" className="flex items-center gap-2 mb-1 block w-fit bg-white rounded-[20px]">
                        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  className="w-8 h-8 rounded-full text-black p-[5px]">
                            <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default LandingPage;
