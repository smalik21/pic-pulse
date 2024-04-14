import photosIcon from "../../assets/photos-icon.svg"
import videosIcon from "../../assets/videos-icon.svg"
import searchIcon from "../../assets/search-icon.svg"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParameter } from "../../hooks/useParameter"

const Search = () => {
   const [searchType, setSearchType] = useState<string>("photo")
   const inputRef = useRef<HTMLInputElement>(null)

   const { type, update } = useParameter()
   const navigate = useNavigate()

   useEffect(() => setSearchType(type), [type])

   const onSearchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => setSearchType(e.target.value)

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const query: string = inputRef.current?.value || ''
      if (query === '') return
      const type: string = (searchType === "photo") ? "image" : searchType

      update("TYPE", type)
      navigate("/search/" + query)
      inputRef.current!.value = ''
   }

   return (
      <div id="search" className="w-full p-1 sms:p-0 flex gap-4 flex-col items-center">
         <form id="search-bar" onSubmit={handleSubmit} className="px-1 py-1 sm:py-1.5 sm:pl-2 w-full text-black flex gap-2 items-center bg-light dark:bg-dark rounded-xl dark:border dark:border-gray-2">
            <div className="p-1 sm:pl-2 sm:gap-1 flex items-center text-xs sm:text-sm bg-gray-1 dark:bg-dark dark:border border-gray-600 rounded-md">
               <img
                  className="size-4 sm:size-5 absolute dark:invert"
                  src={searchType === "video" ? videosIcon : photosIcon}
                  alt={`${searchType}-icon`}
               />
               <select
                  id="search-type"
                  name="search-type"
                  className="pl-5 py-0.5 rounded-md bg-transparent outline-none dark:text-white"
                  value={searchType}
                  onChange={onSearchTypeChange}
               >
                  <option className="dark:text-white dark:bg-dark" value="photo">Photos</option>
                  <option className="dark:text-white dark:bg-dark" value="video">Videos</option>
               </select>
            </div>
            <input className="w-1/2 pl-1 sm:pl-2 text-sm sm:text-lg grow bg-light dark:text-white dark:bg-dark dark:caret-white outline-none"
               id="search-input"
               placeholder="Search"
               type="text"
               name="search-input"
               ref={inputRef}
            />
            <button className="sm:p-1" type="submit">
               <img className="size-5 sm:size-6" src={searchIcon} alt="search-icon" />
            </button>
         </form >
      </div >
   )
}

export default Search
