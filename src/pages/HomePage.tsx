import { useEffect, useState } from "react"
import { useImage } from "../hooks/useImage"
import { useVideo } from "../hooks/useVideo"
import { useParameter } from "../hooks/useParameter"
import HomeHeader from "../components/headers/HomeHeader"
import SearchHeader from "../components/headers/SearchHeader"
import ContentSection from "../components/ContentSection"
import SearchType from "../components/search/SearchType"
import ScrollToTopButton from "../components/ScrollToTopButton"

const HomePage = () => {

   const { loadImages } = useImage()
   const { loadVideos } = useVideo()
   const { reset, resetParameters } = useParameter()

   const [showSearchHeader, setShowSearchHeader] = useState<boolean>(false)

   // Floating search header
   useEffect(() => {
      const handleScroll = () => {
         const homeHeaderHeight = document.getElementById('homeHeader')!.offsetHeight
         if (!homeHeaderHeight) return
         // Check if homeHeader is scrolled out of view
         if (window.scrollY >= homeHeaderHeight) {
            setShowSearchHeader(true)
         } else {
            setShowSearchHeader(false)
         }
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const load = () => {
      loadImages('')
      loadVideos('')
   }

   useEffect(() => {
      if (reset) load()
      else resetParameters()
   }, [reset])

   return (
      <>
         {showSearchHeader && <ScrollToTopButton />}
         <HomeHeader />
         {showSearchHeader && <SearchHeader />}
         <SearchType page="home" />
         <ContentSection />

      </>
   )
}

export default HomePage
