import { useParameter } from "../../hooks/useParameter"

type SearchTypePropTypes = { page: string }

const searchTypes = ['Photos', 'Videos']
const SearchType = ({ page }: SearchTypePropTypes) => {

   const { type, update } = useParameter()

   const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value === "Photos" ? "image" : "video"
      update("TYPE", value)
   }

   return (
      <section id="search-type" className={`flex px-2 sm:px-8 my-4 sm:mt-8 gap-2 sm:gap-4 justify-center ${page === "search" ? " xs:justify-start" : ""}`}>
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
                     className="flex px-6 py-3 sm:px-8 sm:py-4 border border-black dark:border-gray-1 rounded-full font-semibold text-sm sm:text-base 
                                        peer-checked:bg-black peer-checked:text-white dark:peer-checked:bg-gray-1 dark:peer-checked:text-black cursor-pointer"
                  >
                     {searchType}
                  </label>
               </span>
            )
         })}
      </section>
   )
}

export default SearchType
