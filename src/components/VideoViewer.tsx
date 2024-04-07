import { useState, useEffect } from "react"
import { videoType } from "../contexts/VideoContext"
import TagButton from "./TagButton"
import CloseIcon from "../assets/close-icon.svg"
import BookmarkIcon from "../assets/bookmark-icon.svg"
import BookmarkFilledIcon from "../assets/bookmark-filled-icon.svg"
import { useFile } from "../hooks/useFile"

type VideoViewerPropTypes = {
   video: videoType | undefined,
   setShowVideoViewer: React.Dispatch<React.SetStateAction<boolean>>,
}

const VideoViewer = ({ video, setShowVideoViewer }: VideoViewerPropTypes) => {

   const [saved, setSaved] = useState<boolean>(false)
   const [saving, setSaving] = useState<boolean>(false)
   const [removing, setRemoving] = useState<boolean>(false)
   const [downloading, setDownloading] = useState<boolean>(false)
   const { files, addFile, deleteFile, loadFiles } = useFile()

   // const saved: boolean = files?.find(file => file.type === "video" && file.id === video?.videoId.toString()) ? true : false

   const handleClose = () => setShowVideoViewer(false)

   const handleSave = () => {
      if (!video) return
      setSaving(true)
      addFile("video", video, video.videoId)
         .then(() => {
            console.log("video saved")
            setSaved(true)
         })
         .catch(error => console.log("error saving file:", error))
         .finally(() => setSaving(false))
   }

   const handleRemove = () => {
      if (!video) return
      setRemoving(true)
      deleteFile(video.videoId)
         .then(() => {
            console.log("video removed")
            setSaved(false)
         })
         .catch(error => console.log("error removing file:", error))
         .finally(() => setRemoving(false))
   }

   const handleDownload = async () => {
      if (!video) return
      console.log("downloading...")
      setDownloading(true)
      try {
         const response = await fetch(video.small.videoURL)
         const blob = await response.blob()
         const url = window.URL.createObjectURL(blob)
         const link = document.createElement('a')
         link.href = url
         link.setAttribute('download', `${video.videoId}.mp4`)
         document.body.appendChild(link)
         link.click()
         document.body.removeChild(link)
         window.URL.revokeObjectURL(url)
      } catch {
         console.log("unable to download.")
      } finally {
         setDownloading(false)
      }
      // saveAs(video.normal.videoURL + "&download=1", video.videoId + '-picPulse.mp4')
   }

   useEffect(() => {
      console.log("updated files:", files)
      setSaved(files?.find(file => file.type === "image" && file.id === video?.videoId.toString()) ? true : false)
   }, [files, video])

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const space = document.getElementById("emptySpace")
         const videoViewer = document.getElementById("videoViewer")
         if (space && space.contains(event.target as Node) && videoViewer && !videoViewer.contains(event.target as Node)) {
            handleClose()
         }
      }
      window.addEventListener("click", handleClickOutside)
      return () => window.removeEventListener("click", handleClickOutside)
   }, [])

   return (
      <div id="emptySpace" className="h-dvh w-full top-0 fixed flex flex-col justify-start items-center bg-black bg-opacity-90 z-10">
         <article id="videoViewer" className="w-full max-h-full mt-24 sm:mt-12 sm:w-2/3 rounded-xl overflow-y-scroll thin-scrollbar bg-light">
            <span className="absolute -mt-12 sm:mt-0 sm:-ml-16">
               <button onClick={handleClose} className="size-10 opacity-80 hover:opacity-100 active:opacity-80">
                  <img src={CloseIcon} alt="close-icon" />
               </button>
            </span>
            <section className="p-2 mt-2 xs:p-4 xs:px-8 flex flex-col gap-4 sm:gap-8 items-center">
               <section className="w-full flex flex-row justify-between">
                  {(saved)
                     ? (
                        <button id="bookmark-filled" onClick={handleRemove} disabled={removing} className="size-8 sm:size-10 invert opacity-80 hover:opacity-100 active:opacity-80 disabled:cursor-wait">
                           <img src={BookmarkFilledIcon} alt="bookmark-filled-icon" />
                        </button>
                     )
                     : (
                        <button id="bookmark" onClick={handleSave} disabled={saving} className="size-8 sm:size-10 invert opacity-80 hover:opacity-100 active:opacity-80 disabled:cursor-wait">
                           <img src={BookmarkIcon} alt="bookmark-icon" />
                        </button>
                     )
                  }
                  <button
                     onClick={handleDownload}
                     className="w-fit py-2 px-4 text-sm sm:text-base text-white bg-green-700 hover:bg-green-600 active:bg-green-800 rounded-md disabled:cursor-wait"
                     disabled={downloading}
                  >
                     Download
                  </button>
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
