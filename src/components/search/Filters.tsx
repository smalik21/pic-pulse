import { useParameter } from "../../hooks/useParameter"
import { REDUCER_ACTION_TYPE } from "../../contexts/ParameterContext"

const categories: string[] = ["all", "backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"]
const colours: string[] = ["all", "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"]
const orientations: string[] = ["all", "horizontal", "vertical"]
const ordering: string[] = ["popular", "latest"]

const Filters = () => {

   const { type, category, colour, orientation, order, update } = useParameter()

   const handleParameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const parameterName: REDUCER_ACTION_TYPE = e.target.name as REDUCER_ACTION_TYPE
      let parameterValue: string = e.target.value.toLowerCase()
      parameterValue = parameterValue === "all" ? "" : parameterValue
      update(parameterName, parameterValue)
   }

   const filters = [
      { "name": "CATEGORY", "parameter": "CATEGORY", "options": categories, "value": category, "video": true },
      { "name": "COLOUR", "parameter": "COLOUR", "options": colours, "value": colour, "video": false },
      { "name": "ORIENTATION", "parameter": "ORIENTATION", "options": orientations, "value": orientation, "video": false },
      { "name": "SORT", "parameter": "ORDER", "options": ordering, "value": order, "video": true },
   ]

   return (
      <section className="py-4 px-2 overflow-clip flex flex-col md:flex-row items-center md:justify-center md:gap-4">
         <input
            id="filters-toggle"
            name="filters-toggle"
            type="checkbox"
            className="peer appearance-none md:hidden px-3 py-1.5 border border-black dark:border-white rounded-md flex
                            before:inline-block before:content-['FILTERS'] before:text-xs before:sm:text-sm
                            checked:before:text-white checked:bg-dark dark:checked:before:text-dark dark:checked:bg-white"
         />
         <section className="hidden peer-checked:flex md:flex items-baseline mt-4 pb-1 md:p-0 md:m-0 w-full md:w-fit overflow-x-scroll no-scrollbar gap-3 sm:gap-6 xs:justify-center">
            {filters.map(filter => {
               if (type === "video" && !filter.video) return
               return (
                  <article key={filter.name} className="flex flex-col items-center gap-2">
                     <label className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-1">{filter.name}</label>
                     <div className="w-fit text-xs sm:text-sm flex items-center border border-black dark:border-gray-2 rounded-md">
                        <select
                           id={filter.name}
                           name={filter.parameter}
                           className="px-3 py-1.5 text-xs sm:text-sm dark:text-white dark:bg-dark rounded-md bg-transparent outline-none"
                           onChange={handleParameterChange}
                           value={filter.value}
                        >
                           {filter.options.map(option => {
                              return (
                                 <option
                                    key={option}
                                    value={option}
                                 >
                                    {option.toUpperCase()}
                                 </option>
                              )
                           })}
                        </select>
                     </div>
                  </article>
               )
            })}
         </section>
      </section>
   )
}

export default Filters
