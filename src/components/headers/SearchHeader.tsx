import PageTitle from "../PageTitle"
import PageOptions from "../PageOptions"
import Search from "../Search"

const SearchHeader = () => {
   return (
      <header className="py-3 p-2 sm:p-4 gap-4 lg:gap-8 flex flex-wrap justify-between items-center text-white bg-heroSection bg-cover shadow-lg shadow-gray-800 sticky top-0 z-10">
         <PageTitle />
         <span className="lg:order-last"><PageOptions /></span>
         <section className="w-full mx-auto xs:w-4/5 sm:w-2/3 lg:w-fit lg:grow">
            <Search />
         </section>
      </header>
   )
}

export default SearchHeader
