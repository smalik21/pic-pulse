import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Filters from "../components/Filters"
import MainSection from "../components/MainSection"
import SearchHeader from "../components/SearchHeader"
import SearchType from "../components/SearchType"
import { useParameter } from "../hooks/useParameter"
import { useImage } from "../hooks/useImage"
import { useVideo } from "../hooks/useVideo"

const SearchPage = () => {

   const [similarTags, setSimilarTags] = useState<string[]>()

   const { type, query, update } = useParameter()
   const { imageTags, loadImages } = useImage()
   const { videoTags, loadVideos } = useVideo()
   const { q } = useParams()
   const navigate = useNavigate()

   useEffect(() => {
      if (q) {
         update("QUERY", q)
         loadImages(q)
         loadVideos(q)
      }
      else navigate('/')
   }, [q])

   useEffect(() => {
      if (type === "image") setSimilarTags(imageTags)
      else if (type === "video") setSimilarTags(videoTags)
   }, [type])

   return (
      <>
         <SearchHeader />
         <section id="similar-queries" className="w-full px-2 sm:px-8 flex gap-4 sm:gap-8 py-4 sm:py-8 overflow-scroll no-scrollbar">
            {similarTags && similarTags.map((query, idx) => {
               return (
                  <button key={idx} className="px-4 py-2 text-nowrap text-xs sm:text-base border border-black rounded-md">{query}</button>
               )
            })}
         </section>
         <h3 className="my-2 sm:my-4 px-2 sm:px-8 sm:text-lg lg:text-xl">Showing results for
            <span className="font-bold italic"> {query}</span>
         </h3>
         <SearchType page="search" />
         <Filters />
         <MainSection />
      </>
   )
}

export default SearchPage
