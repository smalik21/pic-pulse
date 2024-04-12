import axios from 'axios'
import { videoType } from '../contexts/VideoContext'
import { videoDetailType } from '../contexts/VideoContext'

const cache: { [url: string]: videoType[] } = {}

export const fetchVideos = async (url: string): Promise<videoType[]> => {
   try {

      if (cache[url]) {
         return cache[url]
      }

      const response = await axios.get(url)

      const videos: videoType[] = response.data.hits.map((video: any) => {
         const normal: videoDetailType = {
            videoURL: video.videos.medium.url,
            thumbnail: video.videos.medium.thumbnail
         }
         const small: videoDetailType = {
            videoURL: video.videos.small.url,
            thumbnail: video.videos.small.thumbnail
         }
         const data: videoType = {
            videoId: video.id,
            normal: normal,
            small: small,
            videoTags: video.tags.split(", "),
         }
         return data
      })
      cache[url] = videos

      return videos
   } catch (error) {
      throw new Error('Error fetching videos')
   }
}