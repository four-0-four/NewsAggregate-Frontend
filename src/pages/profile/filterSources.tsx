import NewsSourceIcon from '../../components/NewsSourceIcon'
import Box from '../../components/Box/Box'
import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/Inputs/SearchInput'
import SearchResults from '../../components/Inputs/SearchResults'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { useNavigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../../lib/features/user/slice'
import { BlacklistedNewsSources, InterestedNewsSources, NewsSourceState, allNewsSources, newsSourceStatus } from '../../lib/features/newsSource/slice'
import { addNewsSourcePreference, getAllNewsSources, getAllUserNewsSourcesBlacklist, getAllUserNewsSourcesPreferences, removeNewsSourcePreference } from '../../lib/features/newsSource/thunks'
import NewsSourceIconPlaceholder from '../../components/Placeholders/NewsSourceIconPlaceholder'

type Props = {}

const FilterSources = (props: Props) => {
    const dispatch = useAppDispatch(); // Use Redux's useDispatch
    const navigate = useNavigate(); // Use useNavigate for navigation
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    let allNewsSourcesState:NewsSourceState[] = useAppSelector(allNewsSources) ?? []
    let InterestedNewsSourcesState:NewsSourceState[] = useAppSelector(InterestedNewsSources) ?? []
    let BlacklistedNewsSourcesState:NewsSourceState[] = useAppSelector(BlacklistedNewsSources) ?? []
    let statusState = useAppSelector(newsSourceStatus)

    const [allNewsSrc, setAllNewsSrc] = useState(allNewsSourcesState)
    const [InterestedNewsSrc, setInterestedNewsSrc] = useState(InterestedNewsSourcesState)
    const [BlacklistedNewsSrc, setBlacklistedNewsSrc] = useState(BlacklistedNewsSourcesState)
    const [is, setIs] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            Promise.all([
                dispatch(getAllNewsSources()),
                dispatch(getAllUserNewsSourcesPreferences()),
                dispatch(getAllUserNewsSourcesBlacklist())
            ]).then(() => setIs(false)) // Set  to false once both promises resolve
            .catch(() => setIs(false)); 
        } else {
            setIs(false); // Set  to false if not authenticated
        }
    }, []);

    useEffect(() => {
        setAllNewsSrc(allNewsSourcesState)
        setInterestedNewsSrc(InterestedNewsSourcesState)
        setBlacklistedNewsSrc(BlacklistedNewsSourcesState)
    }, [allNewsSourcesState, InterestedNewsSourcesState, BlacklistedNewsSourcesState]);
    
    let [search, setSearch] = useState('');

    
    const removeSource = (id:number) => {
        // Check if the source exists in the InterestedNewsSrc
        const sourceExists = InterestedNewsSrc.some(source => source.id === id);
        
        if (!sourceExists) {
            // Optionally, handle the case where the source doesn't exist, e.g., log an error or display a message
            return;
        }
    
        // Proceed with removing the source from InterestedNewsSrc
        const updatedInterestedNewsSrc = InterestedNewsSrc.filter(source => source.id !== id);
        setInterestedNewsSrc(updatedInterestedNewsSrc);
    
        // Dispatch the action to remove the source preference
        localStorage.removeItem("feed");
        dispatch(removeNewsSourcePreference({ news_source_id: id }));
    };

    const addSource = (id:number) => {
        // First, check if the source is already included in the InterestedNewsSrc
        if (InterestedNewsSrc.some(source => source.id === id)) return;
      
        // Find the source object in allNewsSrc
        const newSource = allNewsSrc.find(source => source.id === id);
        if (!newSource) return; // If the source doesn't exist in allNewsSrc, exit the function
      
        // Insert the new source in the sorted position within InterestedNewsSrc
        const updatedInterestedNewsSrc = [...InterestedNewsSrc];
        const insertAt = updatedInterestedNewsSrc.findIndex(source => source.id > id);
        
        // If insertAt is -1, it means the new source has the highest id and should be added at the end
        if (insertAt === -1) {
          updatedInterestedNewsSrc.push(newSource);
        } else {
          updatedInterestedNewsSrc.splice(insertAt, 0, newSource);
        }
      
        // Update the state with the new list of interested sources
        setInterestedNewsSrc(updatedInterestedNewsSrc);
      
        // Dispatch the action to add the source preference
        localStorage.removeItem("feed");
        dispatch(addNewsSourcePreference({ news_source_id: id }));
      };

    const MIN_INTERESTED_SOURCES = 3
    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-y-4">
            <Box title="Which News Sources Do You Want to See?">
                <p className='mb-5 text-sm sm:text-md'>Please choose the news sources you want to add to your personalized feed. Note that these selections will only affect your feed and will not change the content displayed on the Explore or Topic pages</p>
                <SearchInput 
                    placeholder={'Search for News Sources'} 
                    name={'search'} 
                    value={search} 
                    onChange={(e)=>setSearch(e.target.value)}
                />
                {search && (
                    <SearchResults 
                        allNewsSources={allNewsSrc} 
                        selectedSources={InterestedNewsSrc}
                        excludingSources={BlacklistedNewsSrc} //IMPORTANT: in preferences, we should exclude blacklisted sources
                        button={true}
                        buttonText={'Add'}
                        value={search}
                        action={addSource}
                    />
                )}
                <p className='text-xs mt-5 text-gray-400'>Please note: Our collection of news sources is constantly expanding. Some sources will be integrated soon, whereas others might take longer owing to geolocation constraints. Rest assured, we will inform you as soon as new sources become available.</p>
            </Box>
            <Box title="Interested News Sources">
                <p className='text-sm text-gray-300 mt-[-15px]'>(Min 3 news sources)</p>
                {is ? (
                    <div className='flex flex-row flex-wrap gap-5 mt-6'>
                        <NewsSourceIconPlaceholder />
                        <NewsSourceIconPlaceholder />
                        <NewsSourceIconPlaceholder />
                        <NewsSourceIconPlaceholder />
                    </div>
                ):(
                    <>
                        <div className='flex flex-row flex-wrap gap-5 mt-6'>
                            {InterestedNewsSrc.map((source) => (
                                <NewsSourceIcon name={source.name} logo={source.logo} id={source.id} action={removeSource} actionType={InterestedNewsSrc.length>MIN_INTERESTED_SOURCES?'remove':''}/>
                            ))}
                        </div>
                        {statusState === 'succeeded' && InterestedNewsSrc.length<=MIN_INTERESTED_SOURCES && (
                            <div className="text-red-500 text-sm leading-4 flex flex-col sm:flex-row items-center mt-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 inline-block mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                To remove a current news source, you must first add a new one, since you are already at the minimum number of required news sources
                            </div>
                        )}
                    </>
                )}
            </Box>

        </div>
    )
}

export default FilterSources