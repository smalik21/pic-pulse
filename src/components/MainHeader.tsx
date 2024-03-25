import PageTitle from "./PageTitle"
import PageOptions from "./PageOptions"
import Search from "./Search"

const MainHeader = () => {
   return (
      <header className="py-3 p-2 sm:p-4 text-white bg-heroSection bg-cover sm:rounded-b-3xl">
         <section className="w-full flex justify-between">
            <PageTitle />
            <PageOptions />
         </section>
         <section className="w-full max-w-3xl mx-auto xs:w-4/5 sm:w-2/3 py-14 sm:py-16 lg:py-20 sm:rounded-b-3xl">
            <h3 id="search-header" className="w-full mb-2 sm:mb-4 lg:mb-6 sm:text-2xl text-center text-light font-search">SEARCH FREE IMAGES AND VIDEOS</h3>
            <Search />
         </section>
      </header>
   )
}

export default MainHeader
