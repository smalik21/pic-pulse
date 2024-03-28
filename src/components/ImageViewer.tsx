import { useEffect } from "react"
import { imageType } from "../contexts/ImageContext"
import { saveAs } from "file-saver"
import TagButton from "./TagButton"
import CloseIcon from "../assets/close-icon.svg"
import BookmarkIcon from "../assets/bookmark-icon.svg"
import BookmarkFilledIcon from "../assets/bookmark-filled-icon.svg"

type ImageViewerPropTypes = {
   image: imageType | undefined,
   setShowImageViewer: React.Dispatch<React.SetStateAction<boolean>>,
}

const ImageViewer = ({ image, setShowImageViewer }: ImageViewerPropTypes) => {

   const handleClose = () => setShowImageViewer(false)

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const space = document.getElementById("emptySpace")
         const imageViewer = document.getElementById("imageViewer")
         if (space && space.contains(event.target as Node) && imageViewer && !imageViewer.contains(event.target as Node)) {
            handleClose()
         }
      }
      window.addEventListener("click", handleClickOutside)
      return () => {
         window.removeEventListener("click", handleClickOutside)
      }
   }, [])

   const handleDownload = () => {
      if (!image) return
      saveAs(image.imageURL, image.imageId + '-picPulse.jpg')
   }

   return (
      <div id="emptySpace" className="h-dvh w-full top-0 fixed flex flex-col justify-start items-center bg-black bg-opacity-90 z-10">
         <article id="imageViewer" className="w-full max-h-full mt-24 sm:w-2/3 rounded-xl overflow-y-scroll thin-scrollbar bg-light">
            <span className="absolute -mt-12 sm:mt-0 sm:-ml-16">
               <button onClick={handleClose} className="size-10 opacity-80 hover:opacity-100 active:opacity-80">
                  <img src={CloseIcon} alt="close-icon" />
               </button>
            </span>
            <section className="p-2 mt-2 xs:p-4 xs:px-8 flex flex-col gap-4 sm:gap-8 items-center">
               <section className="w-full flex flex-row justify-between">
                  {/* use check-box */}
                  <button className="size-10 invert opacity-80 hover:opacity-100 active:opacity-80">
                     <img src={BookmarkIcon} alt="bookmark-icon" />
                  </button>
                  <button onClick={handleDownload} className="w-fit py-2 px-4 text-white bg-green-700 hover:bg-green-600 active:bg-green-800 rounded-md">
                     Download
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
