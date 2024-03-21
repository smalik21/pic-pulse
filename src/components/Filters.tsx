import { useParameter } from "../hooks/useParameter"
import { REDUCER_ACTION_TYPE } from "../contexts/ParameterContext"

const filters = [
   { "name": "CATEGORY", "parameter": "CATEGORY", "options": ["ALL", "ABSTRACT", "NATURE", "BLACK"], "video": true },
   { "name": "COLOUR", "parameter": "COLOUR", "options": ["ALL", "RED", "YELLOW", "BLUE"], "video": false },
   { "name": "ORIENTATION", "parameter": "ORIENTATION", "options": ["ALL", "HORIZONTAL", "VERTICAL"], "video": false },
   { "name": "SORT", "parameter": "ORDER", "options": ["POPULAR", "LATEST"], "video": true },
]

const Filters = () => {

   const { update, type } = useParameter()

   const handleParameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("change:")
      const parameterName: REDUCER_ACTION_TYPE = e.target.name as REDUCER_ACTION_TYPE
      let parameterValue: string = e.target.value.toLowerCase()
      parameterValue = parameterValue === "all" ? "" : parameterValue

      update(parameterName, parameterValue)
   }

   return (
      <section className="py-4 px-2 overflow-clip flex flex-col md:flex-row items-center md:justify-center md:gap-4">
         <input
            id="filters-toggle"
            name="filters-toggle"
            type="checkbox"
            className="peer appearance-none md:hidden px-3 py-1.5 border border-black rounded-md flex
                            before:inline-block before:content-['FILTERS'] before:text-xs before:sm:text-sm
                            checked:before:text-white checked:bg-dark"
         />
         <section className="hidden peer-checked:flex md:flex items-baseline mt-4 pb-1 md:p-0 md:m-0 w-full md:w-fit overflow-x-scroll no-scrollbar gap-3 sm:gap-6 xs:justify-center">
            {filters.map(filter => {
               if (type === "video" && !filter.video) return
               return (
                  <article key={filter.name} className="flex flex-col items-center gap-2">
                     <label className="text-xs sm:text-sm font-bold text-gray-500">{filter.name}</label>
                     <div className="w-fit text-xs sm:text-sm flex items-center border border-black rounded-md">
                        <select
                           id={filter.name}
                           name={filter.parameter}
                           className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-transparent outline-none"
                           onChange={handleParameterChange}
                        >
                           {filter.options.map(option => {
                              return (
                                 <option
                                    key={option}
                                    value={option}
                                 >
                                    {option}
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
