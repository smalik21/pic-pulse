import { useEffect } from "react"
import { imageType } from "../contexts/ImageContext"

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

   return (
      <div id="emptySpace" className="h-dvh w-full top-0 fixed flex justify-center items-center">
         <article id="imageViewer" className="w-full xs:w-2/3 md:w-1/2 bg-red-400">
            <span className="w-full flex justify-end">
               <button onClick={handleClose} className="">Close</button>
            </span>
            <section className="p-8 pt-0 gap-8 flex flex-col sm:flex-row justify-evenly">
               <figure className="m-auto p-4">
                  <img
                     src={image?.imageURL}
                     alt="image"
                     className="w-full max-w-80 max-h-80"
                  />
               </figure>
               <section className="flex flex-col justify-between">
                  <aside className="flex flex-wrap gap-4">
                     {image?.imageTags.map(tag => <button key={tag}>{tag}</button>)}
                  </aside>
                  <button>Download</button>
               </section>
            </section>
         </article>
      </div>
   )
}

export default ImageViewer
