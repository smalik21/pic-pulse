import { useParameter } from '../hooks/useParameter'
import { useImage } from '../hooks/useImage'
import { useVideo } from '../hooks/useVideo'
import { useEffect } from 'react'

const MainSection = () => {

   const { type } = useParameter()
   const { images, loading } = useImage()
   const { videos } = useVideo()

   useEffect(() => {
      console.log("Loaded...")
   }, [images, videos, type])

   const fallback = <h1 className='absolute w-full mt-4 sm:mt-10 text-center text-lg sm:text-3xl text-gray-500'>No results to display!</h1>

   return (
      <main className='p-2 sm:p-4 mt-4 sm:mt-10 grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
         {loading ? (
            <h1>Loading...</h1>
         ) : (
            type === "image" ? (
               images.length > 0 ? (
                  images.map(image => (
                     <img
                        key={image.imageId}
                        className='w-full h-full object-cover rounded-xl border border-slate-400'
                        src={image.imageURL}
                        loading='lazy'
                     />
                  ))
               ) : fallback
            ) : (
               type === "video" && (
                  videos.length > 0 ? (
                     videos.map(video => (
                        <img
                           key={video.videoId}
                           className='w-full h-full object-cover rounded-xl border border-slate-400'
                           src={video.small.thumbnail}
                           loading='lazy'
                        />
                     ))
                  ) : fallback
               )
            )
         )}
      </main>
   )
}

export default MainSection
