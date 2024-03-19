import Filters from "../components/Filters"
import MainSection from "../components/MainSection"
import SearchHeader from "../components/SearchHeader"
import { useParameter } from "../hooks/useParameter"

const similarQueries = ['PHOTOS', 'NATURE', 'PHOTOGRAPHY', 'PHOTOS', 'NATURE', 'PHOTOGRAPHY', 'PHOTOS', 'NATURE', 'PHOTOGRAPHY', 'PHOTOS', 'NATURE', 'PHOTOGRAPHY']
const searchTypes = ['Photos', 'Videos'] // Users

const SearchPage = () => {

   const { update, type, query } = useParameter()

   const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value === "Photos" ? "image" : "video"
      update("TYPE", value)
   }

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
            <span className="font-bold italic"> {query}</span>
         </h3>
         <section id="search-type" className="flex px-2 sm:px-8 my-4 sm:mt-8 gap-2 sm:gap-4 justify-center xs:justify-start">
            {searchTypes.map(searchType => {
               return (
                  <span key={searchType}>
                     <input
                        type="radio"
                        name="search-type"
                        id={searchType}
                        value={searchType}
                        className="hidden peer"
                        checked={(searchType === "Photos" && type === "image") || (searchType === "Videos" && type === "video")}
                        onChange={handleTypeChange}
                     />
                     <label
                        htmlFor={searchType}
                        className="flex px-6 py-3 sm:px-8 sm:py-4 border border-black rounded-full font-semibold text-sm sm:text-base 
                                        peer-checked:bg-black peer-checked:text-white cursor-pointer">
                        {searchType}
                     </label>
                  </span>
               )
            })}
         </section>

         <Filters />
         <MainSection />
      </>
   )
}

export default SearchPage
