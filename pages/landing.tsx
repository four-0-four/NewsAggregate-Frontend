// pages/landing.tsx

import React from 'react';


const LandingPage: React.FC = () => {
  return (
    <div>
        {/* Section 1 */}
        <section className="flex flex-col sm:flex-row justify-between items-center py-8">
            <div className="w-full sm:w-3/5 md:w-3/5 mb-8 md:mb-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-left">Your Trusted Source for Aggregated and Independent News</h1>
                <button className="bg-primary text-black text-md lg:text-lg py-2 px-12 rounded-[25px] uppercase mt-4">Register</button>
            </div>
            <div className="w-full sm:w-2/5 md:w-3/5">
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/landing1.png" alt="Right Side Image" className="mx-auto w-4/6 sm:max-w-full h-auto" />
            </div>
        </section>

        {/* Section 2 */}
        <section className="py-12 lg:py-24">
            <p className="text-2xl lg:text-3xl font-medium mb-4 text-left">Explore global news from top sources like BBC, ESPN, Reuters, The Guardian, and Al Jazeera on Farabix</p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 my-12">
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source1.png" alt="reuters" className="w-2/3 sm:w-2/6 lg:w-1/6 h-auto" />
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source2.png" alt="bbc" className="h-8 w-auto lg:h-12 h-auto" />
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source3.png" alt="espn" className="w-auto h-8 lg:h-12 h-auto" />
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source4.png" alt="theguardian" className="w-auto h-8 lg:h-14 h-auto" />
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source5.png" alt="aljazeera" className="w-2/3 sm:w-2/6 h-auto" />
            </div>
        </section>

        {/* Section 3 */}
        <section className="flex flex-col sm:flex-row justify-center items-center mb-8">
            <div className="w-full mb-4 sm:mb-0">
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/landing2.png" alt="Left Side Image" className="mx-auto w-4/6 sm:max-w-full h-auto" />
            </div>
            <div className="w-full">
                <p className="text-3xl lg:text-4xl font-normal text-left">Get all your news in one place, quickly and conveniently</p>
            </div>
        </section>

        {/* Section 4 */}
        <section className="flex flex-col sm:flex-row justify-center items-center mb-12 md:mb-24">
            <div className="w-full sm:w-1/2 order-2 sm:order-1 mb-0 md:ml-3">
                <p className="text-3xl lg:text-4xl font-normal text-left">Select your interests and enjoy a tailored stream of news</p>
            </div>
            <div className="w-full sm:w-1/2 order-1 sm:order-2 my-8 sm:my-0">
                <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/landing3.png" alt="Right Side Image" className="mx-auto w-4/6 sm:max-w-full h-auto" />
            </div>
        </section>
    </div>
  );
};

export default LandingPage;
