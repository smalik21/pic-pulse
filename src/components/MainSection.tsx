import { useParameter } from '../hooks/useParameter'
import { useImage } from '../hooks/useImage'
import { useVideo } from '../hooks/useVideo'
import { useEffect, useState } from 'react'
import { imageType } from '../contexts/ImageContext'
import ImageViewer from './ImageViewer'
import VideoViewer from './VideoViewer'
import { videoType } from '../contexts/VideoContext'

const MainSection = () => {
   const [showImageViewer, setShowImageViewer] = useState<boolean>(false)
   const [showVideoViewer, setShowVideoViewer] = useState<boolean>(false)

   const [selectedImage, setSelectedImage] = useState<imageType>()
   const [selectedVideo, setSelectedVideo] = useState<videoType>()

   const { type } = useParameter()
   const { images, imageLoading } = useImage()
   const { videos, videoLoading } = useVideo()

   useEffect(() => {
      console.log("Loaded...")
   }, [images, videos, type])

   const handleImageClick = (image: imageType) => {
      setSelectedImage(image)
      setShowImageViewer(true)
   }

   const handleVideoClick = (video: videoType) => {
      setSelectedVideo(video)
      setShowVideoViewer(true)
   }

   const fallback = <h1 className='absolute w-full mt-4 sm:mt-10 text-center text-lg sm:text-3xl text-gray-500'>No results to display!</h1>

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
         <main className='p-2 sm:p-4 mt-4 sm:mt-10 grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {(imageLoading || videoLoading) ? (
               <h1>Loading...</h1>
            ) : (
               type === "image" ? (
                  images.length > 0 ? (
                     images.map(image => (
                        <img
                           key={image.imageId}
                           className='w-full h-full object-cover hover:scale-105 active:scale-100 active:cursor-default transition-all cursor-pointer rounded-xl border border-slate-400'
                           src={image.imageURL}
                           loading='lazy'
                           onClick={() => handleImageClick(image)}
                        />
                     ))
                  ) : fallback
               ) : (
                  type === "video" && (
                     videos.length > 0 ? (
                        videos.map(video => (
                           <img
                              key={video.videoId}
                              className='w-full h-full object-cover hover:scale-105 active:scale-100 active:cursor-default transition-all cursor-pointer rounded-xl border border-slate-400'
                              src={video.small.thumbnail}
                              loading='lazy'
                              onClick={() => handleVideoClick(video)}
                           />
                        ))
                     ) : fallback
                  )
               )
            )}
         </main>
      </>
   )
}

export default MainSection
