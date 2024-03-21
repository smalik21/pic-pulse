import { useEffect } from "react"
import MainHeader from "../components/MainHeader"
import MainSection from "../components/MainSection"
import SearchType from "../components/SearchType"
import { useImage } from "../hooks/useImage"
import { useVideo } from "../hooks/useVideo"

const HomePage = () => {

   const { loadImages } = useImage()
   const { loadVideos } = useVideo()

   useEffect(() => {
      loadImages('')
      loadVideos('')
   }, [])

   return (
      <>
         <MainHeader />
         <SearchType page="home" />
         <MainSection />
      </>
   )
}

export default HomePage
