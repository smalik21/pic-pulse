import axios from 'axios'
import { videoType } from '../contexts/VideoContext'
import { videoDetailType } from '../contexts/VideoContext'

const cache: { [url: string]: videoType[] } = {}

export const fetchVideos = async (url: string): Promise<videoType[]> => {
   try {

      if (cache[url]) {
         console.log("Cached response found for URL:", url)
         return cache[url]
      }

      const response = await axios.get(url)

      console.log("response:", response.data)

      const videos: videoType[] = response.data.map((video: any) => {
         const normal: videoDetailType = {
            videoURL: video.medium.url,
            thumbnail: video.medium.thumbnail
         }
         const small: videoDetailType = {
            videoURL: video.small.url,
            thumbnail: video.small.thumbnail
         }
         const data: videoType = {
            videoId: video.id,
            normal: normal,
            small: small,
            videoTags: video.tags,
         }
         return data
      })
      cache[url] = videos

      // return videos
      return []
   } catch (error) {
      // console.error('Error fetching videos:', error)
      throw new Error('Error fetching videos')
   }
}