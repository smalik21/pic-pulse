import { useParameter } from '../hooks/useParameter'
import { useImage } from '../hooks/useImage'
import { useVideo } from '../hooks/useVideo'

const MainSection = () => {

   const { type } = useParameter()
   const { images } = useImage()
   const { videos } = useVideo()

   return (
      <main className='p-2 sm:p-4 grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
         {type === "image" && images.map(image => {
            return <img
               key={image.imageId}
               className='w-full h-full object-cover'
               src={image.imageURL}
            />

         })}
         {type === "video" && videos.map(video => {
            return <img
               key={video.videoId}
               className='w-full h-full object-cover'
               src={video.normal.thumbnail}
            />
         })}
      </main>
   )
}

export default MainSection
