import axios from 'axios'
import { imageType } from '../contexts/ImageContext'

const cache: { [url: string]: imageType[] } = {}

export const fetchImages = async (url: string): Promise<imageType[]> => {
   try {

      if (cache[url]) {
         return cache[url]
      }

      const response = await axios.get(url)

      const images: imageType[] = response.data.hits.map((image: any) => ({
         imageId: image.id,
         previewURL: image.previewURL,
         imageURL: image.largeImageURL,
         imageTags: image.tags.split(", "),
      }))
      cache[url] = images

      return images
   } catch (error) {
      throw new Error('Error fetching images')
   }
}