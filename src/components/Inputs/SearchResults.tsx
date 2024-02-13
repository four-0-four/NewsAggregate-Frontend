import React from 'react';
import { newsSourceI } from '../../pages/profile/filterSources';
import NewsSourceIcon from '../NewsSourceIcon';

type Props = {
    allNewsSources: newsSourceI[];
    selectedSources: newsSourceI[];
    button?: boolean;
    buttonText?: string;
    value: string; // Add value to the props
    action: (source: string) => void
};

const SearchResults: React.FC<Props> = ({ allNewsSources, selectedSources, button, buttonText, value, action }) => {
    // First, create a lookup set of selected source names for faster checks
    const selectedSourceNames = new Set(selectedSources.map(source => source.name.toLowerCase()));

    // Filter news sources based on the value and ensure they are not already selected
    const filteredNewsSources = allNewsSources.filter(source =>
        source.name.toLowerCase().includes(value.toLowerCase()) &&
        !selectedSourceNames.has(source.name.toLowerCase()) // Exclude sources that are already selected
    );

    return (
        <div className='relative w-full max-h-[200px] overflow-y-scroll my-6'>
            <div className='flex flex-row flex-wrap w-full gap-5'>
                {filteredNewsSources.length > 0 ? (
                    filteredNewsSources.map((source, index) => (
                        <NewsSourceIcon name={source.name} logo={source.logo} action={() => action(source.name)} actionType={buttonText ?? "Add"} />
                    ))
                ) : (
                    <div className='text-center text-gray-500 py-3'>No sources found</div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
