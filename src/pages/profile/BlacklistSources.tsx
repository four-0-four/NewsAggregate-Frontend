import NewsSourceIcon from '../../components/NewsSourceIcon'
import Box from '../../components/Box/Box'
import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/Inputs/SearchInput'
import SearchResults from '../../components/Inputs/SearchResults'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { useNavigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../../lib/features/user/slice'
import { BlacklistedNewsSources, InterestedNewsSources, NewsSourceState, allNewsSources, newsSourceStatus } from '../../lib/features/newsSource/slice'
import { addNewsSourceBlacklist, getAllNewsSources, getAllUserNewsSourcesBlacklist, getAllUserNewsSourcesPreferences, removeNewsSourceBlacklist } from '../../lib/features/newsSource/thunks'
import NewsSourceIconPlaceholder from '../../components/Placeholders/NewsSourceIconPlaceholder'

type Props = {}


const BlacklistSources = (props: Props) => {
    const dispatch = useAppDispatch(); // Use Redux's useDispatch
    const navigate = useNavigate(); // Use useNavigate for navigation
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    let allNewsSourcesState:NewsSourceState[] = useAppSelector(allNewsSources) ?? []
    let BlacklistedNewsSourcesState:NewsSourceState[] = useAppSelector(BlacklistedNewsSources) ?? []
    let InterestedNewsSourcesState:NewsSourceState[] = useAppSelector(InterestedNewsSources) ?? []
    let statusState = useAppSelector(newsSourceStatus)

    const [allNewsSrc, setAllNewsSrc] = useState(allNewsSourcesState)
    const [InterestedNewsSrc, setInterestedNewsSrc] = useState(InterestedNewsSourcesState)
    const [BlacklistedNewsSrc, setBlacklistedNewsSrc] = useState(BlacklistedNewsSourcesState)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            // Assume both actions return promises
            Promise.all([
                dispatch(getAllNewsSources()),
                dispatch(getAllUserNewsSourcesPreferences()),
                dispatch(getAllUserNewsSourcesBlacklist())
            ]).then(() => setIsLoading(false)) // Set loading to false once both promises resolve
              .catch(() => setIsLoading(false)); // Ensure loading is set to false even if there's an error
        } else {
            setIsLoading(false); // Set loading to false if not authenticated
        }
    }, []);

    useEffect(() => {
        setAllNewsSrc(allNewsSourcesState)
        setInterestedNewsSrc(InterestedNewsSourcesState)
        setBlacklistedNewsSrc(BlacklistedNewsSourcesState)
    }, [allNewsSourcesState, BlacklistedNewsSourcesState, InterestedNewsSourcesState]);
    
    let [search, setSearch] = useState('');

    
    const removeSource = (id:number) => {
        // Check if the source exists in the BlacklistedNewsSrc
        const sourceExists = BlacklistedNewsSrc.some(source => source.id === id);
        
        if (!sourceExists) {
            // Optionally, handle the case where the source doesn't exist, e.g., log an error or display a message
            console.log(`Source with id ${id} not found in interested sources.`);
            return;
        }
    
        // Proceed with removing the source from BlacklistedNewsSrc
        const updatedBlacklistedNewsSrc = BlacklistedNewsSrc.filter(source => source.id !== id);
        setBlacklistedNewsSrc(updatedBlacklistedNewsSrc);
    
        // Dispatch the action to remove the source preference
        dispatch(removeNewsSourceBlacklist({ news_source_id: id }));
    };

    const addSource = (id:number) => {
        // First, check if the source is already included in the BlacklistedNewsSrc
        if (BlacklistedNewsSrc.some(source => source.id === id)) return;
      
        // Find the source object in allNewsSrc
        const newSource = allNewsSrc.find(source => source.id === id);
        if (!newSource) return; // If the source doesn't exist in allNewsSrc, exit the function
      
        // Insert the new source in the sorted position within BlacklistedNewsSrc
        const updatedBlacklistedNewsSrc = [...BlacklistedNewsSrc];
        const insertAt = updatedBlacklistedNewsSrc.findIndex(source => source.id > id);
        
        // If insertAt is -1, it means the new source has the highest id and should be added at the end
        if (insertAt === -1) {
          updatedBlacklistedNewsSrc.push(newSource);
        } else {
          updatedBlacklistedNewsSrc.splice(insertAt, 0, newSource);
        }
      
        // Update the state with the new list of interested sources
        setBlacklistedNewsSrc(updatedBlacklistedNewsSrc);
      
        // Dispatch the action to add the source preference
        dispatch(addNewsSourceBlacklist({ news_source_id: id }));
      };

    const MAX_BLACKLISTED_SOURCES = 5

    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-y-4">
            <Box title="Which news sources do you want to blacklist?">
                <p className='mb-5 text-sm sm:text-md'>This feature allows users to hide news from specific sources they prefer not to see, not only in their feed but also on explore and topic pages. If you wish to change the sources appearing only on your feed page, please visit the <a className='text-primary' href="/profile/filterSources">"Filter News Source"</a> page</p>
                <SearchInput 
                    placeholder={'Search for News Sources'} 
                    name={'search'} 
                    value={search} 
                    onChange={(e)=>setSearch(e.target.value)}
                />
                {
                    search && BlacklistedNewsSrc.length>=MAX_BLACKLISTED_SOURCES && (
                        <div className="text-red-500 text-sm leading-4 flex flex-row items-center mt-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 inline-block mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            You've blacklisted the maximum number of news sources. To add a new one, please remove an existing source from your list first
                        </div>
                    )
                }
                {BlacklistedNewsSrc.length<MAX_BLACKLISTED_SOURCES && search && (
                    <>
                        <SearchResults 
                            allNewsSources={allNewsSrc}
                            selectedSources={BlacklistedNewsSrc}
                            excludingSources={InterestedNewsSrc}
                            button={true}
                            buttonText={BlacklistedNewsSrc.length<MAX_BLACKLISTED_SOURCES?'Add':'s'}
                            value={search}
                            action={addSource}
                        />
                        <p className='text-xs mt-5 text-gray-400'>Note: We are continuously adding new sources. Some will be added shortly, while others may take longer due to geolocation constraints. We will notify you as soon as they are included.</p>
                    </>
                )}
            </Box>
            <Box title="Blacklisted News Sources">
                <p className='text-sm text-gray-300 mt-[-15px]'>(Max 5 news sources)</p>
                {isLoading ? (
                    <div className='flex flex-row flex-wrap gap-5 mt-6'>
                        <NewsSourceIconPlaceholder /> 
                    </div>
                ) : BlacklistedNewsSourcesState.length > 0 ? (
                    <>
                        <div className='flex flex-row flex-wrap gap-5 mt-6'>
                        {BlacklistedNewsSrc.map((source) => (
                            <NewsSourceIcon  id={source.id} name={source.name} logo={source.logo} action={removeSource} actionType={'remove'}/>
                        ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-sm leading-4 flex flex-col items-center mt-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 block mb-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            You haven't blacklisted any news sources!
                        </div>
                    </>
                )}
            </Box>

        </div>
    )
}

export default BlacklistSources