import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Filters from "../components/Filters"
import MainSection from "../components/MainSection"
import SearchHeader from "../components/SearchHeader"
import SearchType from "../components/SearchType"
import { useParameter } from "../hooks/useParameter"
import { useImage } from "../hooks/useImage"
import { useVideo } from "../hooks/useVideo"
import ScrollToTopButton from "../components/ScrollToTopButton"

const SearchPage = () => {

   const { type, query, update } = useParameter()
   const { imageTags, loadImages } = useImage()
   const { videoTags, loadVideos } = useVideo()
   const { q } = useParams()
   const navigate = useNavigate()

   const load = (q: string) => {
      loadImages(q)
      loadVideos(q)
   }

   const handleQueryChange = (query: string) => {
      navigate('/search/' + query)
   }

   useEffect(() => {
      if (q) {
         load(q)
         update("QUERY", q)
      }
      else navigate('/')
   }, [q])

   return (
      <>
         <ScrollToTopButton />
         <SearchHeader />
         <section id="similar-queries" className="w-full px-2 sm:px-8 flex gap-4 sm:gap-8 py-4 sm:py-8 overflow-scroll no-scrollbar">
            {type === "image" && imageTags.map((query, idx) => {
               return <button
                  key={idx}
                  onClick={() => handleQueryChange(query)}
                  className="px-4 py-2 text-nowrap text-xs sm:text-base border border-black rounded-md">
                  {query}
               </button>
            })}
            {type === "video" && videoTags.map((query, idx) => {
               return <button
                  key={idx}
                  onClick={() => handleQueryChange(query)}
                  className="px-4 py-2 text-nowrap text-xs sm:text-base border border-black rounded-md">
                  {query}
               </button>
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
