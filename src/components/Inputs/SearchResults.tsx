import React from 'react';
import NewsSourceIcon from '../NewsSourceIcon';
import { NewsSourceState } from '@/src/lib/features/newsSource/slice';

type Props = {
    allNewsSources: NewsSourceState[];
    selectedSources: NewsSourceState[];
    excludingSources: NewsSourceState[];
    button?: boolean;
    buttonText?: string;
    value: string; // Add value to the props
    action: (id: number) => void
};

const SearchResults: React.FC<Props> = ({ allNewsSources, selectedSources, excludingSources, button, buttonText, value, action }) => {
    console.log(selectedSources, excludingSources)
    // Combine selectedSources and excludingSources into one list for exclusion
    const combinedExclusionSet = new Set([...selectedSources, ...excludingSources].map(source => source.name.toLowerCase()));

    // Filter news sources based on the value and ensure they are not in the combined exclusion list
    const filteredNewsSources = allNewsSources.filter(source =>
        source.name.toLowerCase().includes(value.toLowerCase()) &&
        !combinedExclusionSet.has(source.name.toLowerCase()) // Exclude sources from both selected and excluding lists
    );

    return (
        <div className='relative w-full max-h-[200px] overflow-y-scroll my-6'>
            <div className='flex flex-row flex-wrap w-full gap-5'>
                {filteredNewsSources.length > 0 ? (
                    filteredNewsSources.map((source, index) => (
                        <NewsSourceIcon id={source.id} name={source.name} logo={source.logo} action={() => action(source.id)} actionType={buttonText ?? "Add"} />
                    ))
                ) : (
                    <div className='text-center text-gray-500 py-3'>No sources found</div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
