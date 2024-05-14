// pages/landing.tsx

import Accordion from '../../components/Accordion';
import React, { useEffect } from 'react';
import styles from './CustomStyles.module.scss';
import Footer from './Footer';
import { useAppDispatch } from '../../lib/hooks';
import { getAllNewsSourcesLanding } from '../../lib/features/newsSource/thunks';

const point =()=>(<svg width="27" height="46" viewBox="0 0 27 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.41171 45.8484L0.365068 45.9292C0.365068 45.9292 0.36501 45.911 0.365124 45.8756C0.334525 45.8934 0.318732 45.9025 0.318732 45.9025L0.365374 45.8217C0.373448 44.4737 0.578297 30.8067 5.54786 24.9306C7.26315 22.9024 9.88188 19.984 12.7123 16.8297C17.9636 10.9775 23.9434 4.31339 26.2338 1.01623L26.7797 0.0707746C26.6716 0.258032 26.5569 0.474986 26.4361 0.719287C26.5874 0.492591 26.7179 0.284784 26.826 0.0975266L26.2802 1.04298C24.5699 4.6751 21.7885 13.1859 19.346 20.6597C18.0295 24.6881 16.8115 28.4152 15.9127 30.9147C13.3086 38.1565 1.57508 45.1674 0.41171 45.8484Z" fill="#F9CF45"/>
</svg>)

const LandingPage: React.FC = () => {
    const dispatch = useAppDispatch();
    
    function smoothScroll(e) {
        e.preventDefault(); // Prevent the default anchor behavior
        const targetId = e.currentTarget.getAttribute('href'); // Get the href attribute of the clicked element
        const targetElement = document.querySelector(targetId); // Select the target element
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Smoothly scroll to the target element
                block: 'center' // Align the target element in the center of the viewport
            });
        }
    }

    useEffect(() => {
        dispatch(getAllNewsSourcesLanding())
    }, [dispatch]);
    return (
        <div className='w-full scroll-smooth'>
            {/* Section 1 */}
            <section className="bg-gray-100">
                <div className='overflow-hidden flex flex-col sm:flex-row justify-between items-end sm:items-center mx-auto  md:px-10  max-w-[1200px] '>
                    <div className="w-full sm:w-4/5 md:w-3/5 md:w-[500px] md:px-0 px-8 md:px-4 md:pb-20 pt-24 sm:pt-0 md:pt-24">
                        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold sm:mb-2 text-left lg:!leading-tight">Your <span className={styles.underlined}>Trusted</span> Source for Aggregated and Independent News</h1>
                        <h3 className='mb-6 mt-4 sm:my-7 lg:mb-6 lg:mb-2 text-sm md:text-md lg:text-lg xl:!leading-normal'>Customize your news experience: stay informed, stay engaged, stay in control</h3>
                        <a href="#getStarted" className={`md:inline-block text-md lg:text-lg w-auto sm:mr-0 mr-0 px-6 pr-4 py-3 sm:py-2 text-black rounded-full capitalize mb-1 sm:mb-4 md:mb-0 order-1 sm:order-2 bg-primary hover:bg-opacity-80`}  onClick={smoothScroll}>
                            Get Started &rarr;
                        </a>
                    </div>
                    <div className="hidden sm:block sm:w-2/5 lg:w-3/5 bg-primary min-h-[550px] h-min" style={{ clipPath: "polygon(2% 0, 30% 0, 100% 100%, 29% 100%)" }}>
                    </div>
                    <div className="block sm:hidden w-3/5 bg-primary min-h-[200px] h-min" style={{ clipPath: "polygon(100% 0, 100% 54%, 66% 100%, 0% 100%)" }}>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <div className={`block bg-gray-100 mt-[-40px]`}>
                <div className="bg-white min-h-[30px] h-min mx-auto mb-[-1px] w-full" style={{ clipPath: "polygon(75% 0, 0% 100%, 100% 100%)" }}></div>
                <div className='bg-white w-full min-h-[40px] sm:min-h-[70px] relative overflow-hidden'>
                    <img src="./newsSources.png" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[1000px] sm:max-w-[1700px] z-10"/>
                </div>
                <div className="bg-white min-h-[30px] h-min mx-auto mb-[-2px] w-full" style={{ clipPath: "polygon(100% 0, 100% 100%, 75% 6%, 0 100%, 0% 0%)" }}></div>
            </div>

            {/* Section 3 */}
            <div className='bg-gray-100 pb-12 lg:pb-20'>
                <div className="grid md:grid-cols-[60%,40%] lg:grid-cols-[50%,50%] grid-cols-1 gap-4 pt-6 sm:pt-14 max-w-[1200px] mx-auto px-4 xs:px-10">
                    <div className="order-2 md:order-1 xs:p-5 px-3 xs:px-8 sm:px-5 max-w-[500px] mx-auto">
                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold mb-2 text-left lg:!leading-tight'>
                            <span className={styles.underlined}>+20</span> News Sources! All in One Place
                        </h1>
                        <h3 className='text-sm md:text-md xl:text-lg mt-3 md:mt-6'>Explore Global News From Top & Trusted Sources</h3>
                        <div className='mt-4'>
                            <div className="flex items-start gap-2 xs:w-fit w-full mb-6">
                                <div className="w-5 h-5 lg:w-9 lg:h-9 rounded-[10px] flex items-center justify-center mt-3 mr-1">
                                    {point()}
                                </div>
                                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                                    <h3 className='text-md lg:text-lg font-bold mb-1'>
                                        Access to Popular and Trusted News Sources
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-700">
                                        Gain access to a curated selection of over 20 of the most popular and trusted news sources, all conveniently located in one place
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 xs:w-fit w-full">
                                <div className="w-5 h-5 lg:w-9 lg:h-9 rounded-[10px] flex items-center justify-center mt-3 mr-1">
                                    {point()}
                                </div>
                                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                                    <h3 className='text-md lg:text-lg font-bold mb-1'>
                                        Global News Coverage
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-700">
                                        Our platform offers comprehensive global news coverage, currently including trusted sources from Canada, the UK, the USA, Australia, and New Zealand
                                    </div>
                                </div>
                            </div>
                        </div>                
                    </div>
                    <div className="order-1 md:order-2 flex items-center justify-center relative">
                        <img src={"/landing.png"} className='xs:w-full md:w-full m-auto max-w-[400px] max-w-[90%] xs:max-w-[80%] sm:max-w-[60%] md:max-w-[90%] lg:max-w-[80%]'/>
                    </div>
                </div>
            </div>


            {/* Section 4 */}
            <div className='bg-gray-100 pb-12 lg:pb-20'>
                <div className="grid md:grid-cols-[40%,60%] lg:grid-cols-[50%,50%] grid-cols-1 gap-4 max-w-[1200px] mx-auto px-4 xs:px-10">
                    <div className="order-2 md:order-2 xs:p-5 px-3 xs:px-8 sm:px-5 max-w-[500px] mx-auto">
                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold mb-2 text-left lg:!leading-tight'>
                            Pick Your Favorite News Sources
                        </h1>
                        <h3 className='text-sm md:text-md xl:text-lg mt-3 md:mt-6'>Customize Your News Feed with Selected News Sources</h3>
                        <div className='mt-4'>
                            <div className="flex items-start gap-2 xs:w-fit w-full mb-6">
                                <div className="w-5 h-5 lg:w-9 lg:h-9 rounded-[10px] flex items-center justify-center mt-3 mr-1">
                                    {point()}
                                </div>
                                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                                    <h3 className='text-md lg:text-lg font-bold mb-1'>
                                        Select Your Preferred News Sources
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-700">
                                        Choose which news sources you trust and prefer to receive your news from, tailoring your feed to match your preferences.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 xs:w-fit w-full">
                                <div className="w-5 h-5 lg:w-9 lg:h-9 rounded-[10px] flex items-center justify-center mt-3 mr-1">
                                    {point()}
                                </div>
                                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                                    <h3 className='text-md lg:text-lg font-bold mb-1'>
                                        Streamline Your News Consumption
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-700">
                                        Consolidate your news intake by gathering all your favorite sources in one location, saving you time and effort.    
                                    </div>
                                </div>
                            </div>
                        </div>                
                    </div>
                    <div className="order-1 md:order-1 flex items-center justify-center relative">
                        <img src={"/select.png"} className='xs:w-full md:w-full m-auto max-w-[400px] max-w-[85%] xs:max-w-[75%] sm:max-w-[55%] md:max-w-[90%] lg:max-w-[80%]'/>
                    </div>
                </div>
            </div>

            {/* Section 5 */}
            <div className='bg-gray-100 pb-12 lg:pb-20'>
                <div className="grid md:grid-cols-[60%,40%] lg:grid-cols-[50%,50%] grid-cols-1 gap-4 max-w-[1200px] mx-auto px-4 xs:px-10">
                    <div className="order-2 md:order-1 xs:p-5 px-3 xs:px-8 sm:px-5 max-w-[500px] mx-auto">
                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold mb-2 text-left lg:!leading-tight'>
                            Pick Your Interests
                        </h1>
                        <h3 className='text-sm md:text-md xl:text-lg mt-3 md:mt-6'>Discover News on Topics That Interest You</h3>
                        <div className='mt-4'>
                            <div className="flex items-start gap-2 xs:w-fit w-full mb-6">
                                <div className="w-5 h-5 lg:w-9 lg:h-9 rounded-[10px] flex items-center justify-center mt-3 mr-1">
                                    {point()}
                                </div>
                                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                                    <h3 className='text-md lg:text-lg font-bold mb-1'>
                                        Customize Your Feed by Topic
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-700">
                                        Tailor your news feed by selecting the topics that interest you the most, ensuring your news is always relevant and engaging.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 xs:w-fit w-full">
                                <div className="w-5 h-5 lg:w-9 lg:h-9 rounded-[10px] flex items-center justify-center mt-3 mr-1">
                                    {point()}
                                </div>
                                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                                    <h3 className='text-md lg:text-lg font-bold mb-1'>
                                        Cut Through The Noise
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-700">
                                        By choosing your interersts, you eliminate distractions from topics of no interest. This targeted approach ensures you spend time only on news that's relevant to you, enhancing both efficiency and enjoyment. 
                                    </div>
                                </div>
                            </div>
                        </div>                
                    </div>
                    <div className="order-1 md:order-2 flex items-center justify-center relative">
                        <img src={"/interest.png"} className='xs:w-full md:w-full m-auto max-w-[400px] max-w-[95%] xs:max-w-[90%] sm:max-w-[60%] md:max-w-[100%] lg:max-w-[90%]'/>
                    </div>
                </div>
            </div>

            {/* Section 6 */}
            <div className='bg-gray-100 pb-12 lg:pb-20'>
                <div className="grid md:grid-cols-[40%,60%] lg:grid-cols-[50%,50%] grid-cols-1 gap-4 max-w-[1200px] mx-auto px-4 xs:px-10">
                    <div className="order-2 md:order-2 xs:p-5 px-3 xs:px-8 sm:px-5 max-w-[500px] mx-auto">
                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold mb-2 text-left lg:!leading-tight'>
                            And of course... Secure and Safe
                        </h1>
                        <h3 className='text-sm md:text-md xl:text-lg mt-3 md:mt-6'>Ensuring Your Peace of Mind</h3>
                        <div className='mt-4'>
                            <div className="flex items-start gap-2 xs:w-fit w-full mb-6">
                                <div className="w-5 h-5 lg:w-9 lg:h-9 rounded-[10px] flex items-center justify-center mt-3 mr-1">
                                    {point()}
                                </div>
                                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                                    <h3 className='text-md lg:text-lg font-bold mb-1'>
                                        Robust Privacy Protection
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-700">
                                        We use advanced security measures to keep your personal information safe, ensuring your privacy is always respected.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 xs:w-fit w-full">
                                <div className="w-5 h-5 lg:w-9 lg:h-9 rounded-[10px] flex items-center justify-center mt-3 mr-1">
                                    {point()}
                                </div>
                                <div className="flex-1 font-medium leading-5 flex flex-col justify-start items-start ">
                                    <h3 className='text-md lg:text-lg font-bold mb-1'>
                                        Safe Browsing Experience
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-700">
                                        Our platform is fortified against malware and phishing, ensuring your news exploration is secure and worry-free.    
                                    </div>
                                </div>
                            </div>
                        </div>                
                    </div>
                    <div className="order-1 md:order-1 flex items-center justify-center relative">
                        <img src={"/secure.png"} className='xs:w-full md:w-full m-auto max-w-[400px] max-w-[85%] xs:max-w-[75%] sm:max-w-[50%] md:max-w-[85%] lg:max-w-[75%]'/>
                    </div>
                </div>
            </div>

            {/* stay informed */}
            <div className='bg-gray-100 relative'  id="getStarted">
                <div className='min-h-[200px] w-full absolute top-[50%] md:top-[60%] z-0'>
                    <div className='bg-white min-h-[150px] w-full'></div>
                    <div className="bg-white min-h-[30px] w-full mt-[-1px]" style={{ clipPath: "polygon(100% 0, 100% 100%, 28% 30%, 0 100%, 0% 0%)" }}></div>
                </div>
                <div className='z-20 relative mx-3 xs:mx-6'>
                    <div className="bg-black min-h-[30px] h-min mx-auto max-w-[570px] md:max-w-[770px] xl:max-w-[970px] mb-[-1px] w-[92%] xs:w-[94%] sm:w-[95%]" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}>
                    </div>
                    <div className='mx-auto max-w-[600px] md:max-w-[800px] xl:max-w-[1000px] bg-black rounded-[20px] px-5 py-5 xs:p-6'>
                        <div className='max-w-[400px] mx-auto text-center'>
                            <h1 className='text-yellow-300 text-2xl xs:text-3xl lg:text-4xl font-bold mb-1 xs:mb-3'>Subscription Plan</h1>
                            <p className='text-white text-sm lg:texl-lg'>Dive into a world where news is personalized just for you, from the sources you trust to the topics you love</p>
                            <div className='mt-5'>
                                <span className='text-yellow-300 text-1xl xs:text-2xl font-bold'>USD</span>
                                <span className='text-yellow-300 text-3xl xs:text-3xl lg:text-4xl font-bold'>$2.99</span> 
                                <span className='text-white text-md xs:text-lg lg:text-xl font-bold'> / monthly</span>
                            </div>
                            <div className='flex flex-col items-center mt-6'>
                                <div className='w-fit text-left max-w-[300px]'>
                                    <div className='flex items-center mt-2'>
                                        <span className='text-yellow-300 border border-yellow-300 rounded-full p-[2px] px-[6px] mr-2 text-sm'>&#10004;</span>
                                        <span className='text-white leading-5'>Access over 20 news sources</span>
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <span className='text-yellow-300 border border-yellow-300 rounded-full p-[2px] px-[6px] mr-2 text-sm'>&#10004;</span>
                                        <span className='text-white leading-5'>Pick your favorite news sources</span>
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <span className='text-yellow-300 border border-yellow-300 rounded-full p-[2px] px-[6px] mr-2 text-sm'>&#10004;</span>
                                        <span className='text-white leading-5'>Blacklist undesired news sources</span>
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <span className='text-yellow-300 border border-yellow-300 rounded-full p-[2px] px-[6px] mr-2 text-sm'>&#10004;</span>
                                        <span className='text-white leading-5'>Choose interests to tailor your feed</span>
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <span className='text-yellow-300 border border-yellow-300 rounded-full p-[2px] px-[6px] mr-2 text-sm'>&#10004;</span>
                                        <span className='text-white leading-5'>Set up news alerts for key updates</span>
                                    </div>
                                </div>
                            </div>
                            <a href="/auth/Register" className='w-fit block mt-9 bg-yellow-300 text-black px-10 py-2 rounded-full mt-4 hover:bg-opacity-80 font-bold text-md xs:text-lg mx-auto'>Try 14 Days for Free</a>
                            <p className='text-white mt-1 text-xs'>$2.99 per month after Free 14-day trial period</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 7 */}
            <div className='bg-gray-100 xs:pb-2 md:pb-7'>
                <div className="grid md:grid-cols-[70%,30%] grid-cols-1 gap-4 pt-6 pt-14 md:pt-7 max-w-[1200px] mx-auto px-4 xs:px-10">
                    <div className="order-2 md:order-1 py-5 md:px-5 md:pt-20 max-w-[700px] mx-auto">
                        <div>
                            <h1 className='font-bold uppercase text-xl md:text-3xl mt-4 mt-3'>You ask? We answer</h1>
                            <h3 className='text-sm my-3 sm:my-6'>We are alway here to provide full support and clear any doubts that you might have</h3>
                        </div>
                        <div className='grid grid-cols-1 gap-y-3 w-full'>
                            <Accordion question="How does this website ensure the reliability of news sources?" answer="We meticulously curate our news from reputable and established global sources, ensuring the information you receive is accurate and trustworthy."/>
                            <Accordion question="Can I access news from different countries? " answer="Yes, our platform offers news from around the world, giving you a global perspective on current events."/>
                            <Accordion question="Will my personal data and reading preferences be protected and private?" answer="We prioritize user privacy and data protection. Your reading preferences and personal data are securely stored and never shared without consent."/>
                            <Accordion question="Are there any costs involved in signing up for this news service?" answer="Most features of our news aggregation services are available for free, granting access to 25+ of the most popular news sources. Our premium tier enhances user experience with additional features and expands your access to 60+ news sources"/>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 flex items-center justify-center relative md:pt-20">
                        <img src={"/logo_transparent.png"} className='xs:w-full md:w-full m-auto max-w-[400px] hidden md:block md:max-w-[90%] lg:max-w-[80%]'/>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default LandingPage;
