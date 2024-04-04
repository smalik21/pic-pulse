import { useState } from "react"
import { useFile } from "../hooks/useFile"
import { imageType } from "../contexts/ImageContext"
import { videoType } from "../contexts/VideoContext"
import ImageViewer from './ImageViewer'
import VideoViewer from './VideoViewer'

const searchTypes = ['All', 'Photos', 'Videos']

const Saved = () => {
   const [showImageViewer, setShowImageViewer] = useState<boolean>(false)
   const [showVideoViewer, setShowVideoViewer] = useState<boolean>(false)

   const [selectedImage, setSelectedImage] = useState<imageType>()
   const [selectedVideo, setSelectedVideo] = useState<videoType>()

   const [selectedType, setSelectedType] = useState<string>("All")
   const { files, fileLoading } = useFile()

   const handleImageClick = (image: imageType) => {
      setSelectedImage(image)
      setShowImageViewer(true)
   }

   const handleVideoClick = (video: videoType) => {
      setSelectedVideo(video)
      setShowVideoViewer(true)
   }

   const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedType(e.target.value)
   }

   const fallback = (
      <section className="py-8 border-black sm:rounded-xl">
         <h1 className='text-center text-lg sm:text-3xl text-gray-500'>No results to display!</h1>
      </section>
   )

   return (
      <>
         {showImageViewer && (
            <ImageViewer
               image={selectedImage}
               setShowImageViewer={setShowImageViewer}
            />
         )}
         {showVideoViewer && (
            <VideoViewer
               video={selectedVideo}
               setShowVideoViewer={setShowVideoViewer}
            />
         )}

         <main className="sm:pb-8 sm:mx-8 border-t-2 sm:border-2 border-black sm:rounded-xl">

            <section id="search-type" className={`flex px-2 sm:px-8 py-6 sm:py-8 gap-2 sm:gap-4 justify-center`}>
               {searchTypes.map(searchType => {
                  return (
                     <span key={searchType}>
                        <input
                           type="radio"
                           name="search-type"
                           id={searchType}
                           value={searchType}
                           className="hidden peer"
                           checked={searchType === selectedType}
                           onChange={handleTypeChange}
                        />
                        <label
                           htmlFor={searchType}
                           className="flex px-4 py-2 sm:px-6 sm:py-3 border border-black rounded-full text-sm sm:text-base 
                                        peer-checked:bg-black peer-checked:text-white cursor-pointer">
                           {searchType}
                        </label>
                     </span>
                  )
               })}
            </section>

            {(files?.length === 0 ||
               selectedType === "Photos" && files?.filter(file => file.type === "image").length === 0 ||
               selectedType === "Videos" && files?.filter(file => file.type === "video").length === 0)
               ? (
                  fallback
               )
               : (
                  <section className="px-2 py-4 sm:px-6 grid gap-2 sm:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-[200px] sm:auto-rows-[300px] border-slate-400 sm:rounded-xl">
                     {fileLoading ? (
                        <h1>Loading...</h1>
                     ) : (
                        // Render content based on selectedType
                        (() => {
                           if (selectedType === "All") {
                              return files?.map(file => (
                                 file.type === "image" ? (
                                    <img
                                       key={(file.content as imageType).imageId || ''}
                                       className='w-full h-full object-cover hover:scale-105 active:scale-100 active:cursor-default transition-all cursor-pointer rounded-xl border border-slate-400'
                                       src={(file.content as imageType).imageURL}
                                       loading='lazy'
                                       onClick={() => handleImageClick((file.content as imageType))}
                                    />
                                 ) : (
                                    <img
                                       key={(file.content as videoType).videoId}
                                       className='w-full h-full object-cover hover:scale-105 active:scale-100 active:cursor-default transition-all cursor-pointer rounded-xl border border-slate-400'
                                       src={(file.content as videoType).small.thumbnail}
                                       loading='lazy'
                                       onClick={() => handleVideoClick((file.content as videoType))}
                                    />
                                 )
                              ))
                           } else if (selectedType === "Photos") {
                              return files?.map(file => (
                                 file.type === "image" && (
                                    <img
                                       key={(file.content as imageType).imageId || ''}
                                       className='w-full h-full object-cover hover:scale-105 active:scale-100 active:cursor-default transition-all cursor-pointer rounded-xl border border-slate-400'
                                       src={(file.content as imageType).imageURL}
                                       loading='lazy'
                                       onClick={() => handleImageClick((file.content as imageType))}
                                    />
                                 )
                              ))
                           } else {
                              return files?.map(file => (
                                 file.type === "video" && (
                                    <img
                                       key={(file.content as videoType).videoId}
                                       className='w-full h-full object-cover hover:scale-105 active:scale-100 active:cursor-default transition-all cursor-pointer rounded-xl border border-slate-400'
                                       src={(file.content as videoType).small.thumbnail}
                                       loading='lazy'
                                       onClick={() => handleVideoClick((file.content as videoType))}
                                    />
                                 )
                              ))
                           }
                        })()
                     )}
                  </section>
               )}
         </main>
      </>
   )
}

export default Saved
