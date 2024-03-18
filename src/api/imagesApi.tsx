import axios from 'axios'
import { imageType } from '../contexts/ImageContext'

const cache: { [url: string]: imageType[] } = {}

export const fetchImages = async (url: string): Promise<imageType[]> => {
   try {

      if (cache[url]) {
         console.log("Cached response found for URL:", url)
         return cache[url]
      }

      const response = await axios.get(url)

      console.log("response:", response.data)
      // const images: imageType[] = response.data.map((image: any) => ({
      //    id: image.id,
      //    url: image.url,
      //    title: image.title,
      // }))
      // cache[url] = images

      // return images
      return []
   } catch (error) {
      // console.error('Error fetching images:', error)
      throw new Error('Error fetching images')
   }
}