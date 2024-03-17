import { ReactNode, createContext, useState } from "react"
import { fetchImages } from "../api/fetchImages"
import { useQuery } from "../hooks/useQuery"

const apiKey = '' // add real key

const ImageContextInitState = {
   images: [{}],
   imageTags: [""],
   loadImages: () => { }
}

export const ImageContext = createContext(ImageContextInitState)

export type imageType = {
   imageId: string,
   previewURL: string,
   imageURL: string,
   imageTags: string[],
}

function getUniqueTags(images: imageType[]): string[] {
   const uniqueTags: Set<string> = new Set()
   images.forEach((image) => {
      image.imageTags.forEach((tag) => {
         uniqueTags.add(tag)
      })
   })
   return Array.from(uniqueTags)
}

const computeURL = (query: string,
   id: string,
   orientation: string,
   category: string,
   colors: string,
   order: string)
   : string => {

   const baseUrl = 'https://pixabay.com/api/?'
   const queryParams = new URLSearchParams()

   queryParams.append('key', apiKey)
   if (query) queryParams.append('q', query)
   if (id) queryParams.append('id', id)
   if (orientation) queryParams.append('orientation', orientation)
   if (category) queryParams.append('category', category)
   if (colors) queryParams.append('colors', colors)
   if (order) queryParams.append('order', order)

   const finalUrl = baseUrl + queryParams.toString()
   return finalUrl
}

type ImageProviderPropTypes = { children: ReactNode }

export const ImageProvider = ({ children }: ImageProviderPropTypes) => {
   const [images, setImages] = useState<imageType[]>([])
   const [imageTags, setImageTags] = useState<string[]>([])

   const { query, id, orientation, category, colors, order } = useQuery()

   const url = computeURL(query, id, orientation, category, colors, order)

   const loadImages = () => {
      fetchImages(url)
         .then(newImages => {
            setImages(newImages)
            const uniqueTags: string[] = getUniqueTags(newImages)
            setImageTags(uniqueTags)
         })
         .catch(error => console.log(error))
   }

   return (
      <ImageContext.Provider
         value={{
            images,
            imageTags,
            loadImages,
         }}
      >
         {children}
      </ImageContext.Provider>
   )
}