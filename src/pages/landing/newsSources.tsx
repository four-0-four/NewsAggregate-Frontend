import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { getAllNewsSourcesLanding } from '../../lib/features/newsSource/thunks';
import { NewsSourceState, allNewsSources } from '../../lib/features/newsSource/slice';
import Box from '../../components/Box/Box';
import NewsSourceIcon2 from '../../components/NewsSourceIcon2'; // Assuming this component exists
import Footer from './Footer';

const NewsSources = () => {
    const dispatch = useAppDispatch();
    let allNewsSourcesState: NewsSourceState[] = useAppSelector(allNewsSources) ?? [];

    if (!allNewsSourcesState || allNewsSourcesState.length === 0) {
        const allNewsSourcesFromStorage = localStorage.getItem("allNewsSources");
        try {
            allNewsSourcesState = allNewsSourcesFromStorage ? JSON.parse(allNewsSourcesFromStorage) : [];
        } catch (error) {
            allNewsSourcesState = []
        }
    }
    
    useEffect(() => {
        dispatch(getAllNewsSourcesLanding())
    }, [dispatch]);

    // Function to group news sources by country
    const groupByCountry = (newsSources: any[]) => {
        return newsSources.reduce((acc, newsSource) => {
            const { location } = newsSource;
            if (!acc[location]) {
                acc[location] = [];
            }
            acc[location].push(newsSource);
            return acc;
        }, {});
    };

    // Group news sources by country
    const newsSourcesByCountry = groupByCountry(allNewsSourcesState);

    return (
        <div className='w-full'>
            <div className=' px-2 sm:px-6 flex flex-col w-full justify-center items-start min-h-screen mx-auto pt-[100px] max-w-2xl lg:max-w-4xl xl:max-w-6xl mb-12'>
                {allNewsSourcesState.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold inline-block self-start mb-6 ml-2">Our Available News Sources</h2>
                        <div className="flex flex-col justify-center items-center gap-y-4 w-full">
                            {Object.entries(newsSourcesByCountry).map(([country, sources]) => (
                                <Box key={country} title={country} size="large">
                                    <div className='flex flex-row gap-2 gap-x-3 lg:gap-x-6 flex-wrap'>
                                        {(sources as any[]).map(source => ( // Type assertion here for `sources`
                                            <NewsSourceIcon2 key={source.id} name={source.name} logo={source.logo} />
                                        ))}
                                    </div>
                                </Box>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default NewsSources;
