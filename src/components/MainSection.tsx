import { useParameter } from '../hooks/useParameter'
import { useImage } from '../hooks/useImage'
import { useVideo } from '../hooks/useVideo'
import { useEffect } from 'react'

const MainSection = () => {

   const { type } = useParameter()
   const { images } = useImage()
   const { videos } = useVideo()

   useEffect(() => {
      console.log("Loaded...")
   }, [images, videos])

   return (
      <main className='p-2 sm:p-4 mt-4 sm:mt-10 grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
         {type === "image" && images.map(image => {
            return <img
               key={image.imageId}
               className='w-full h-full object-cover rounded-xl border border-slate-400'
               src={image.previewURL}
            />

         })}
         {type === "video" && videos.map(video => {
            return <img
               key={video.videoId}
               className='w-full h-full object-cover rounded-xl border border-slate-400'
               src={video.small.thumbnail}
            />
         })}
      </main>
   )
}

export default MainSection
