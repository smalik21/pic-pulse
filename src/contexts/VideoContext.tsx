import { ReactNode, createContext, useState, useEffect } from "react"
import { fetchVideos } from "../api/videosApi"
import { useParameter } from "../hooks/useParameter"

const apiKey: string = import.meta.env.VITE_PIXABAY_API_KEY

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

const VideoInitState: videoType = {
   videoId: "",
   normal: { videoURL: "", thumbnail: "" },
   small: { videoURL: "", thumbnail: "" },
   videoTags: [""],
}

type VideoContextType = {
   videos: videoType[],
   videoTags: string[],
   loadVideos: (_query: string) => Promise<void>,
   videoLoading: boolean,
}

const VideoContextInitState: VideoContextType = {
   videos: [VideoInitState],
   videoTags: [""],
   loadVideos: (_query: string): Promise<void> => Promise.resolve(),
   videoLoading: false,
}

export const VideoContext = createContext<VideoContextType>(VideoContextInitState)

function getUniqueTags(videos: videoType[]): string[] {
   const uniqueTags: Set<string> = new Set()
   for (const image of videos) {
      for (const tag of image.videoTags) {
         uniqueTags.add(tag)
         if (uniqueTags.size >= 20) return Array.from(uniqueTags)
      }
   }
   return Array.from(uniqueTags)
}

const computeURL = (
   query: string,
   id: string,
   category: string,
   order: string,
   safeSearch: boolean
): string => {

   const baseUrl = 'https://pixabay.com/api/videos/?'
   const queryParams = new URLSearchParams()

   queryParams.append('key', apiKey)
   if (query) queryParams.append('q', query)
   if (id) queryParams.append('id', id)
   if (category) queryParams.append('category', category)
   if (order) queryParams.append('order', order)
   if (safeSearch) queryParams.append('safesearch', safeSearch ? "true" : "false")

   const finalUrl = baseUrl + queryParams.toString()
   return finalUrl
}

type VideoProviderPropTypes = { children: ReactNode }

export const VideoProvider = ({ children }: VideoProviderPropTypes) => {
   const [videos, setvideos] = useState<videoType[]>([])
   const [videoTags, setvideoTags] = useState<string[]>([])
   const [videoLoading, setVideoLoading] = useState<boolean>(false)

   const { id, query, order, category, safeSearch, change } = useParameter()

   useEffect(() => {
      console.log("video change:", change)
      setVideoLoading(true)
      loadVideos(query)
         .then(() => setVideoLoading(false))
   }, [change])

   const loadVideos = async (query: string): Promise<void> => {
      const url = computeURL(query, id, category, order, safeSearch)
      console.log("url:", url)

      return new Promise((resolve, reject) => {
         fetchVideos(url)
            .then(newVideos => {
               setvideos(newVideos)
               const uniqueTags: string[] = getUniqueTags(newVideos)
               setvideoTags(uniqueTags)
               console.log("videos:", newVideos)
               console.log("tags:", uniqueTags)
               resolve()
            })
            .catch(error => reject(error))
      })

   }

   return (
      <VideoContext.Provider
         value={{
            videos,
            videoTags,
            loadVideos,
            videoLoading,
         }}
      >
         {children}
      </VideoContext.Provider>
   )
}