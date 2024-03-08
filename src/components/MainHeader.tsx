import PageTitle from "./PageTitle"
import PageOptions from "./PageOptions"
import Search from "./Search"

const MainHeader = () => {
    return (
        <header className="py-3 p-1 sm:p-4 flex gap-12 pb-12 sm:gap-16 sm:pb-16 lg:gap-20 lg:pb-20 flex-wrap justify-between items-center text-white bg-heroSection bg-cover">
            <PageTitle />
            <PageOptions />
            <Search />
        </header>
    )
}

export default MainHeader
