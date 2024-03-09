
const filters = [
    { "name": "CATEGORY", "options": ["ALL", "ABSTRACT", "NATURE", "BLACK"] },
    { "name": "COLOUR", "options": ["ALL", "RED", "YELLOW", "BLUE"] },
    { "name": "ORIENTATION", "options": ["ALL", "LANDSCAPE", "HORIZONTAL"] },
    { "name": "SORT", "options": ["RELEVANCE", "POPULARITY"] },
]

const Filters = () => {
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
                    return (
                        <article key={filter.name} className="flex flex-col items-center gap-2">
                            <label className="text-xs sm:text-sm font-bold text-gray-500">{filter.name}</label>
                            <div className="w-fit text-xs sm:text-sm flex items-center border border-black rounded-md">
                                <select
                                    id={filter.name}
                                    name={filter.name}
                                    className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-transparent outline-none"
                                >
                                    {/* <option value="">{filter.name}</option> */}
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
