import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Filters from "../components/Filters"
import ContentSection from "../components/ContentSection"
import SearchHeader from "../components/headers/SearchHeader"
import SearchType from "../components/SearchType"
import { useParameter } from "../hooks/useParameter"
import { useImage } from "../hooks/useImage"
import { useVideo } from "../hooks/useVideo"
import ScrollToTopButton from "../components/ScrollToTopButton"
import TagButton from "../components/TagButton"

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
            {type === "image" && imageTags.map(tag => <TagButton key={tag} tag={tag} />)}
            {type === "video" && videoTags.map(tag => <TagButton key={tag} tag={tag} />)}
         </section>
         <h3 className="my-2 sm:my-4 px-2 sm:px-8 sm:text-lg lg:text-xl">Showing results for
            <span className="sm:text-xl lg:text-2xl font-bold italic"> {query}</span>
         </h3>
         <SearchType page="search" />
         <Filters />
         <ContentSection />
      </>
   )
}

export default SearchPage
