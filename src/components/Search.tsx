import photosIcon from "../assets/photos-icon.svg"
import videosIcon from "../assets/videos-icon.svg"
import searchIcon from "../assets/search-icon.svg"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { useParameter } from "../hooks/useParameter"
import { useImage } from "../hooks/useImage"
import { useVideo } from "../hooks/useVideo"

const Search = () => {
   const [searchType, setSearchType] = useState<string>("photo")
   const inputRef = useRef<HTMLInputElement>(null)

   const { update } = useParameter()
   const { loadImages } = useImage()
   const { loadVideos } = useVideo()

   const onSearchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => setSearchType(e.target.value)

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const query: string = inputRef.current?.value || ''
      if (query === '') return
      const type: string = (searchType === "photo") ? "image" : searchType
      update("QUERY", query)
      update("TYPE", type)

      if (type === "photo") loadImages(query)
      else loadVideos(query)

      inputRef.current!.value = ''
   }

   return (
      <div id="search" className="w-full p-1 sms:p-0 flex gap-4 flex-col items-center">
         <form id="search-bar" onSubmit={handleSubmit} className="p-1 sm:pl-2 w-full text-black flex gap-2 items-center bg-light rounded-xl">
            <div className="p-1 sm:pl-2 sm:gap-1 flex items-center text-xs sm:text-sm bg-gray-1 rounded-md">
               <img
                  className="size-4 sm:size-5 absolute"
                  src={searchType === "photo" ? photosIcon : videosIcon}
                  alt={`${searchType}-icon`}
               />
               <select
                  id="search-type"
                  name="search-type"
                  className="pl-5 py-0.5 rounded-md bg-transparent outline-none"
                  value={searchType}
                  onChange={onSearchTypeChange}
               >
                  <option className="text-black bg-gray-1" value="photo">Photos</option>
                  <option className="text-black bg-gray-1" value="video">Videos</option>
               </select>
            </div>
            <input className="w-1/2 sm:pl-2 text-xs sm:text-lg grow bg-light outline-none"
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
