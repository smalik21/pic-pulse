import { useEffect } from "react"
import { videoType } from "../contexts/VideoContext"

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
      <div id="emptySpace" className="h-dvh w-full top-0 fixed flex justify-center items-center">
         <article id="videoViewer" className="w-full xs:w-2/3 md:w-1/2 bg-red-400">
            <span className="w-full flex justify-end">
               <button onClick={handleClose} className="">Close</button>
            </span>
            <section className="p-8 pt-0 gap-8 flex flex-col sm:flex-row justify-evenly">
               <figure className="m-auto p-4">
                  <video controls>
                     <source src={video?.normal.videoURL} />
                     Your browser does not support the video tag.
                  </video>
               </figure>
               <section className="flex flex-col justify-between">
                  <aside className="flex flex-wrap gap-4">
                     {video?.videoTags.map(tag => <button key={tag}>{tag}</button>)}
                  </aside>
                  <button>Download</button>
               </section>
            </section>
         </article>
      </div>
   )
}

export default VideoViewer
