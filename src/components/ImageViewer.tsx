import { useEffect, useState } from "react"
import { imageType } from "../contexts/ImageContext"
import { useFile } from "../hooks/useFile"
import TagButton from "./TagButton"
import CloseIcon from "../assets/close-icon.svg"
import BookmarkIcon from "../assets/bookmark-icon.svg"
import BookmarkFilledIcon from "../assets/bookmark-filled-icon.svg"
import { useAlert } from "../hooks/useAlert"
import { useAuth } from "../hooks/useAuth"

type ImageViewerPropTypes = {
   image: imageType | undefined,
   setShowImageViewer: React.Dispatch<React.SetStateAction<boolean>>,
}

const ImageViewer = ({ image, setShowImageViewer }: ImageViewerPropTypes) => {

   const [saved, setSaved] = useState<boolean>(false)
   const [saving, setSaving] = useState<boolean>(false)
   const [removing, setRemoving] = useState<boolean>(false)
   const [downloading, setDownloading] = useState<boolean>(false)

   const { isAuthenticated } = useAuth()
   const { files, addFile, deleteFile } = useFile()
   const { onSuccess, onError, onInfo } = useAlert()

   const handleClose = () => setShowImageViewer(false)

   const handleSave = () => {
      if (!image) return
      setSaving(true)
      onInfo('Image saving, please wait.')
      addFile("image", image, image.imageId)
         .then(() => {
            console.log("image saved")
            setSaved(true)
            onSuccess('Image saved succesfully!')
         })
         .catch(error => {
            console.log("error saving file:", error)
            if (!isAuthenticated)
               onError('User needs to be logged in!')
            else
               onError(error)
         })
         .finally(() => setSaving(false))
   }

   const handleRemove = () => {
      if (!image) return
      setRemoving(true)
      onInfo('Image Removing, please wait.')
      deleteFile("image", image.imageId)
         .then(() => {
            console.log("image removed")
            setSaved(false)
            onSuccess('Image removed succesfully!')
         })
         .catch(error => {
            console.log("error removing file:", error)
            onError('Error removing image!')
         })
         .finally(() => setRemoving(false))
   }

   const handleDownload = async () => {
      if (!image) return
      console.log("downloading...")
      setDownloading(true)
      try {
         const response = await fetch(image.imageURL)
         const blob = await response.blob()
         const url = window.URL.createObjectURL(blob)
         const link = document.createElement('a')
         link.href = url
         link.setAttribute('download', `${image.imageId}-picPulse.jpg`)
         document.body.appendChild(link)
         link.click()
         document.body.removeChild(link)
         window.URL.revokeObjectURL(url)
         onSuccess('Image downloaded.')
      } catch {
         console.log("unable to download.")
         onError('Error downloading image!')
      } finally {
         setDownloading(false)
      }
   }

   useEffect(() => {
      console.log("updated files:", files)
      setSaved(files?.find(file => file.type === "image" && file.id === image?.imageId.toString()) ? true : false)
   }, [files, image])

   useEffect(() => {
      // console.log("image:", image)
      // console.log("files:", files)
      const handleClickOutside = (event: MouseEvent) => {
         const space = document.getElementById("emptySpace")
         const imageViewer = document.getElementById("imageViewer")
         if (space && space.contains(event.target as Node) && imageViewer && !imageViewer.contains(event.target as Node)) {
            handleClose()
         }
      }
      window.addEventListener("click", handleClickOutside)
      return () => window.removeEventListener("click", handleClickOutside)
   }, [])

   return (
      <div id="emptySpace" className="h-dvh w-full top-0 fixed flex flex-col justify-start items-center bg-black bg-opacity-90 z-10">
         <article id="imageViewer" className="w-full max-h-full mt-24 sm:mt-12 sm:w-2/3 rounded-xl overflow-y-scroll thin-scrollbar bg-light">
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
                     className="w-fit py-2 px-4 text-sm sm:text-base text-white bg-green-700 hover:bg-green-600 active:bg-green-800 rounded-md"
                     disabled={downloading}
                  >
                     {!downloading ? "Download" : <span className="px-7">...</span>}
                  </button>
               </section>
               <figure className="max-w-lg">
                  <img
                     src={image?.imageURL}
                     alt="image"
                     className="object-contain w-full h-full"
                  />
               </figure>
               <aside className="w-full mt-4 mb-8 flex flex-col xs:flex-row gap-4 items-center">
                  <h1 className="xs:text-xl font-bold">More Like This: </h1>
                  <section className="flex flex-wrap gap-4">
                     {image?.imageTags.map(tag => <TagButton key={tag} tag={tag} handleClose={handleClose} />)}
                  </section>
               </aside>
            </section>
         </article>
      </div>
   )
}

export default ImageViewer
