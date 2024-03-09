import Filters from "./Filters"
import MainSection from "./MainSection"
import SearchHeader from "./SearchHeader"

const similarQueries = ['PHOTOS', 'NATURE', 'PHOTOGRAPHY', 'PHOTOS', 'NATURE', 'PHOTOGRAPHY', 'PHOTOS', 'NATURE', 'PHOTOGRAPHY', 'PHOTOS', 'NATURE', 'PHOTOGRAPHY']
const searchTypes = ['Photos', 'Videos'] // Users too?

const SearchPage = () => {
    return (
        <>
            <SearchHeader />
            <section id="similar-queries" className="w-full px-2 sm:px-8 flex gap-4 sm:gap-8 py-4 sm:py-8 overflow-scroll no-scrollbar">
                {similarQueries.map((query, idx) => {
                    return (
                        <button key={idx} className="px-4 py-2 text-xs sm:text-base border border-black rounded-md">{query}</button>
                    )
                })}
            </section>
            <h3 className="my-2 sm:my-4 px-2 sm:px-8 sm:text-lg lg:text-xl">Showing results for
                <span className="font-bold italic"> SEARCH ITEM</span>
            </h3>
            <section id="search-type" className="flex px-2 sm:px-8 my-4 sm:my-8 gap-2 sm:gap-4 justify-center xs:justify-start">
                {searchTypes.map(searchType => {
                    return (
                        <input
                            key={searchType}
                            type="radio"
                            name="search-type"
                            value={searchType}
                            className={`appearance-none 
                            flex px-6 py-3 sm:px-8 sm:py-4 border border-black rounded-full
                            before:inline before:content-['${searchType}'] before:font-semibold before:text-sm sm:before:text-base
                            checked:bg-black checked:before:text-white`}
                        />
                    )
                })}
            </section>
            <Filters />
            <MainSection />
        </>
    )
}

export default SearchPage
