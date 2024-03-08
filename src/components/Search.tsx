import photosIcon from "../assets/photos-icon.svg"
import videosIcon from "../assets/videos-icon.svg"
import arrowIcon from "../assets/arrow-icon.svg"
import searchIcon from "../assets/search-icon.svg"

const Search = () => {
    return (
        <div id="search" className="w-full p-1 sm:p-0 flex gap-4 flex-col items-center">
            <h3 id="search-header" className="sm:text-2xl text-light font-search">SEARCH FREE IMAGES AND VIDEOS</h3>
            <form id="search-bar" className="p-1 sm:pl-2 max-w-80 sm:max-w-7xl w-full sm:w-2/3 lg:w-1/2 text-black flex gap-2 items-center bg-light rounded-xl">
                <div className="p-1 sm:pl-2 sm:gap-1 flex items-center text-xs sm:text-sm bg-gray-1 rounded-md">
                    <img src={photosIcon} className="size-4 sm:size-5" alt="" />
                    <select
                        id="search-type"
                        name="search-type"
                        className="rounded-md bg-transparent outline-none"
                    >
                        <option className="bg-gray-1" value="">Photos</option>
                        <option className="bg-gray-1" value="">Videos</option>
                    </select>
                </div>
                <input className="w-1/2 sm:pl-2 text-xs sm:text-lg grow bg-light outline-none" placeholder="Search" type="text" name="search-input" id="search-input" />
                <button className="sm:p-1" type="submit">
                    <img className="size-5 sm:size-6" src={searchIcon} alt="search-icon" />
                </button>
            </form >
        </div >
    )
}

export default Search
