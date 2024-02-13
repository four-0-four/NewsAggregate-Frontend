import NewsSourceIcon from '../../components/NewsSourceIcon'
import Box from '../../components/Box/Box'
import React, { useState } from 'react'
import SearchInput from '../../components/Inputs/SearchInput'
import SearchResults from '../../components/Inputs/SearchResults'

type Props = {}

export type newsSourceI = {
    name: string,
    logo: string
}

const FilterSources = (props: Props) => {
    let allNewsSources:newsSourceI[] = [
        {name: 'Globe and Mail', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/the-globe-and-mail.png'},
        {name: 'National Post', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/national%20post.png'},
        {name: 'CBC News', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/cbc.png'},
        {name: 'CTV News', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/ctv.png'},
        {name: 'Toronto Sun', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/toronto%20sun.png'},
        {name: 'The Vancouver Sun', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/vancouver-sun.jpg'},
        {name: 'The Montreal Gazette', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/montreal-gazette.jpg'},
        {name: 'Calgary Herald', logo:'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/calgary-herald.png'}
    ]
    
    let [InterestedNewsSources,setInterestedNewsSources] = useState<newsSourceI[]>([
        {name: 'Globe and Mail', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/the-globe-and-mail.png'},
        {name: 'National Post', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/national%20post.png'},
        {name: 'CBC News', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/cbc.png'},
        {name: 'CTV News', logo: 'https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/newsSources/ctv.png'},
    ])

    let [search, setSearch] = useState('');

    
    const removeSource = (source: string) => {
        setInterestedNewsSources(InterestedNewsSources.filter((item) => item.name !== source))
    }

    const addSource = (source: string) => {
        if(InterestedNewsSources.includes(allNewsSources.filter((item) => item.name === source)[0])) return
        setInterestedNewsSources([...InterestedNewsSources, allNewsSources.filter((item) => item.name === source)[0]])
    }

    const MIN_INTERESTED_SOURCES = 3

    return (
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-y-4">
            <Box title="Which News Sources Do You Want to See?">
                <p className='mb-5 text-sm sm:text-md'>Select the specific news sources you wish to include in your personalized feed. This will not affect the content on the Explore page or Topic page. If you wish to remove a news source entirely, including from the Explore page and Topic page, please visit the <a className='text-primary text-underline'>Blacklist News Source</a> Page</p>
                <SearchInput 
                    placeholder={'Search for News Sources'} 
                    name={'search'} 
                    value={search} 
                    onChange={(e)=>setSearch(e.target.value)}
                />
                {search && (
                    <SearchResults 
                        allNewsSources={allNewsSources} 
                        selectedSources={InterestedNewsSources}
                        button={true}
                        buttonText={'Add'}
                        value={search}
                        action={addSource}
                    />
                )}
                <p className='text-xs mt-5 text-gray-400'>Note: We are continuously adding new sources. Some will be added shortly, while others may take longer due to geolocation constraints. We will notify you as soon as they are included.</p>
            </Box>
            <Box title="Interested News Sources">
                <p className='text-sm text-gray-300 mt-[-15px]'>(Min 3 news sources)</p>
                <div className='flex flex-row flex-wrap gap-5 mt-6'>
                {InterestedNewsSources.map((source) => (
                    <NewsSourceIcon name={source.name} logo={source.logo} action={removeSource} actionType={InterestedNewsSources.length>MIN_INTERESTED_SOURCES?'remove':''}/>
                ))}
                </div>
                {InterestedNewsSources.length<=MIN_INTERESTED_SOURCES && (
                    <div className="text-red-500 text-sm leading-4 flex flex-row items-center mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 inline-block mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        You need to add a new interest before you can remove an existing one, as you're at the minimum number of interests required!
                    </div>
                )}
            </Box>

        </div>
    )
}

export default FilterSources