import axios from 'axios'
import { imageType } from '../contexts/ImageContext'

export const fetchImages = async (url: string): Promise<imageType[]> => {
   try {
      const response = await axios.get(url)
      console.log("response:", response.data)
      // const images: imageType[] = response.data.map((image: any) => ({
      //    id: image.id,
      //    url: image.url,
      //    title: image.title,
      // }))
      // return images
      return []
   } catch (error) {
      // console.error('Error fetching images:', error)
      throw new Error('Failed to fetch images')
   }
}