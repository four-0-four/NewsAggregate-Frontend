// pages/landing.tsx

import React from 'react';
import Layout from '../components/Layout';

const LandingPage: React.FC = () => {
  return (
    <Layout>
        <div>
            {/* Section 1 */}
            <section className="flex justify-between items-center p-8">
                <div className="w-3/5">
                    <h1 className="text-5xl font-bold mb-4">Your Trusted Source for Aggregated and Independent News</h1>
                    <button className="bg-primary text-black text-lg py-2 px-12 rounded-[25px] uppercase mt-4">Register</button>
                </div>
                <div className="w-3/5 flex justify-center items-center">
                    <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/landing1.png" alt="Right Side Image" className="max-w-full h-auto" />
                </div>
            </section>

            {/* Section 2 */}
            <section className="p-8 py-24">
                <p className="text-3xl font-medium mb-4">Explore global news from top sources like BBC, ESPN, Reuters, The Guardian, and Al Jazeera on Farabix</p>
                <div className="flex justify-center items-center gap-8 my-12">
                    <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source1.png" alt="reuters" className="w-1/6 h-auto" />
                    <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source2.png" alt="bbc" className="w-auto h-12" />
                    <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source3.png" alt="espn" className="w-auto h-12" />
                    <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source4.png" alt="theguardian" className="w-auto h-14" />
                    <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/news_source5.png" alt="aljazeera" className="w-1/6 h-auto" />
                </div>
            </section>

            {/* Section 3 */}
            <section className="flex justify-center items-center px-8 mb-8">
                <div className="flex-1 flex justify-center items-center">
                    <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/landing2.png" alt="Left Side Image" className="max-w-full h-auto" />
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <p className="text-5xl font-normal max-w-[500px]">Get all your news in one place, quickly and conveniently</p>
                </div>
            </section>

            {/* Section 4 */}
            <section className="flex justify-center items-center px-8 mb-24">
                <div className="flex-1 flex justify-center items-center p-16">
                    <p className="text-5xl font-normal max-w-[500px]">Select your interests and enjoy a tailored stream of news</p>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/landing3.png" alt="Right Side Image" className="max-w-full h-auto" />
                </div>
            </section>
        </div>
    </Layout>
  );
};

export default LandingPage;
