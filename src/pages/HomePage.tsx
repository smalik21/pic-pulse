import { useEffect, useState } from "react"
import { useImage } from "../hooks/useImage"
import { useVideo } from "../hooks/useVideo"
import { useParameter } from "../hooks/useParameter"
import MainHeader from "../components/headers/MainHeader"
import SearchHeader from "../components/headers/SearchHeader"
import MainSection from "../components/MainSection"
import SearchType from "../components/SearchType"
import ScrollToTopButton from "../components/ScrollToTopButton"

const HomePage = () => {

   const { loadImages } = useImage()
   const { loadVideos } = useVideo()
   const { reset, resetParameters } = useParameter()

   const [showSearchHeader, setShowSearchHeader] = useState<boolean>(false)

   useEffect(() => {
      const handleScroll = () => {
         // Check if MainHeader is scrolled out of view
         const mainHeaderHeight = document.getElementById('mainHeader')!.offsetHeight

         if (!mainHeaderHeight) return

         if (window.scrollY >= mainHeaderHeight) {
            setShowSearchHeader(true)
         } else {
            setShowSearchHeader(false)
         }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   const load = () => {
      loadImages('')
      loadVideos('')
   }

   useEffect(() => {
      console.log("effect")
      if (reset) load()
      else resetParameters()
   }, [reset])

   return (
      <>
         {showSearchHeader && <ScrollToTopButton />}
         <MainHeader />
         {showSearchHeader && <SearchHeader />}
         <SearchType page="home" />
         <MainSection />
      </>
   )
}

export default HomePage
