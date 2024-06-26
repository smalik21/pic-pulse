import PageTitle from "../PageTitle"
import PageOptions from "../PageOptions"
import Search from "../search/Search"

const SearchHeader = () => {
   return (
      <header className="py-3 p-2 sm:p-4 gap-4 lg:gap-8 flex flex-wrap sm:flex-nowrap justify-between items-center text-white bg-heroSection bg-cover shadow-lg shadow-gray-800 dark:shadow-none dark:border-b border-gray-700 sticky -top-1 z-10">
         <PageTitle />
         <span className="sm:order-last"><PageOptions /></span>
         <section className="w-full mx-auto xs:w-4/5 sm:w-2/3 lg:w-fit lg:grow">
            <Search />
         </section>
      </header>
   )
}

export default SearchHeader
