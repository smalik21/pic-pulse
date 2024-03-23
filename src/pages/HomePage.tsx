import { useEffect } from "react"
import MainHeader from "../components/MainHeader"
import MainSection from "../components/MainSection"
import SearchType from "../components/SearchType"
import { useImage } from "../hooks/useImage"
import { useVideo } from "../hooks/useVideo"
import { useParameter } from "../hooks/useParameter"

const HomePage = () => {

   const { loadImages } = useImage()
   const { loadVideos } = useVideo()
   const { reset, resetParameters } = useParameter()

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
         <MainHeader />
         <SearchType page="home" />
         <MainSection />
      </>
   )
}

export default HomePage
