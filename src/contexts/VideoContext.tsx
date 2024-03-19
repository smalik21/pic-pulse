import { ReactNode, createContext, useState } from "react"
import { fetchVideos } from "../api/videosApi"
import { useParameter } from "../hooks/useParameter"

const apiKey: string = import.meta.env.VITE_API_KEY

const VideoContextInitState = {
   videos: [{}],
   videoTags: [""],
   loadVideos: (_query: string) => { }
}

export const VideoContext = createContext(VideoContextInitState)

export type videoDetailType = {
   videoURL: string,
   thumbnail: string,
}

export type videoType = {
   videoId: string,
   normal: videoDetailType,
   small: videoDetailType,
   videoTags: string[],
}

function getUniqueTags(videos: videoType[]): string[] {
   const uniqueTags: Set<string> = new Set()
   videos.forEach((video) => {
      video.videoTags.forEach((tag) => {
         uniqueTags.add(tag)
         if (uniqueTags.size >= 20) return true
      })
      return uniqueTags.size >= 20
   })
   return Array.from(uniqueTags)
}

const computeURL = (query: string,
   id: string,
   category: string,
   order: string)
   : string => {

   const baseUrl = 'https://pixabay.com/api/videos/?'
   const queryParams = new URLSearchParams()

   queryParams.append('key', apiKey)
   if (query) queryParams.append('q', query)
   if (id) queryParams.append('id', id)
   if (category) queryParams.append('category', category)
   if (order) queryParams.append('order', order)

   const finalUrl = baseUrl + queryParams.toString()
   return finalUrl
}

type VideoProviderPropTypes = { children: ReactNode }

export const VideoProvider = ({ children }: VideoProviderPropTypes) => {
   const [videos, setvideos] = useState<videoType[]>([])
   const [videoTags, setvideoTags] = useState<string[]>([])

   const { id, orientation, category } = useParameter()

   const loadVideos = (query: string) => {
      const url = computeURL(query, id, orientation, category)
      console.log("url:", url)
      return
      fetchVideos(url)
         .then(newvideos => {
            setvideos(newvideos)
            const uniqueTags: string[] = getUniqueTags(newvideos)
            setvideoTags(uniqueTags)
         })
         .catch(error => console.log(error))
   }

   return (
      <VideoContext.Provider
         value={{
            videos,
            videoTags,
            loadVideos,
         }}
      >
         {children}
      </VideoContext.Provider>
   )
}