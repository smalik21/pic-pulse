import { useEffect } from "react"
import { videoType } from "../contexts/VideoContext"
import TagButton from "./TagButton"

type VideoViewerPropTypes = {
   video: videoType | undefined,
   setShowVideoViewer: React.Dispatch<React.SetStateAction<boolean>>,
}

const VideoViewer = ({ video, setShowVideoViewer }: VideoViewerPropTypes) => {

   const handleClose = () => setShowVideoViewer(false)

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const space = document.getElementById("emptySpace")
         const videoViewer = document.getElementById("videoViewer")
         if (space && space.contains(event.target as Node) && videoViewer && !videoViewer.contains(event.target as Node)) {
            handleClose()
         }
      }

      window.addEventListener("click", handleClickOutside)

      return () => {
         window.removeEventListener("click", handleClickOutside)
      }
   }, [])

   return (
      <div id="emptySpace" className="h-dvh w-full top-0 fixed flex flex-col justify-start items-center bg-black bg-opacity-80 z-10">
         <article id="videoViewer" className="w-full max-h-full mt-24 sm:w-2/3 rounded-xl overflow-y-scroll thin-scrollbar bg-light">
            <span className="absolute -mt-8 sm:mt-0 sm:-ml-16">
               <button onClick={handleClose} className="text-white border">Close</button>
            </span>
            <section className="p-2 mt-2 xs:p-4 xs:px-8 flex flex-col gap-4 sm:gap-8 items-center">
               <section className="w-full flex flex-row justify-between">
                  <button>Save</button>
                  <button className="w-fit py-2 px-4 text-white bg-green-700 hover:bg-green-600 active:bg-green-800 rounded-md">Download</button>
               </section>
               <figure className="max-w-lg">
                  <div className="aspect-video">
                     <video className="w-full h-full object-contain" controls>
                        <source src={video?.normal.videoURL} />
                        Your browser does not support the video tag.
                     </video>
                  </div>
               </figure>
               <aside className="w-full mt-4 mb-8 flex flex-col xs:flex-row gap-4 items-center">
                  <h1 className="xs:text-xl font-bold">More Like This: </h1>
                  <section className="flex flex-wrap gap-4">
                     {video?.videoTags.map(tag => <TagButton key={tag} tag={tag} handleClose={handleClose} />)}
                  </section>
               </aside>
            </section>
         </article>
      </div>
   )
}

export default VideoViewer
