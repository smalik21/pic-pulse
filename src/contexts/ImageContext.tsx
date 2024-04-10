import { ReactNode, createContext, useEffect, useState } from "react"
import { fetchImages } from "../api/imagesApi"
import { useParameter } from "../hooks/useParameter"

const apiKey: string = import.meta.env.VITE_PIXABAY_API_KEY

export type imageType = {
   imageId: string,
   previewURL: string,
   imageURL: string,
   imageTags: string[],
}

const ImageInitState: imageType = {
   imageId: "",
   previewURL: "",
   imageURL: "",
   imageTags: [""],
}

type ImageContextType = {
   images: imageType[],
   imageTags: string[],
   loadImages: (_query: string) => Promise<void>,
   imageLoading: boolean,
}

const ImageContextInitState: ImageContextType = {
   images: [ImageInitState],
   imageTags: [""],
   loadImages: (_query: string): Promise<void> => Promise.resolve(),
   imageLoading: false,
}

export const ImageContext = createContext<ImageContextType>(ImageContextInitState)

function getUniqueTags(images: imageType[]): string[] {
   const uniqueTags: Set<string> = new Set()
   for (const image of images) {
      for (const tag of image.imageTags) {
         uniqueTags.add(tag)
         if (uniqueTags.size >= 20) return Array.from(uniqueTags)
      }
   }
   return Array.from(uniqueTags)
}

const computeURL = (
   query: string,
   id: string,
   orientation: string,
   category: string,
   colour: string,
   order: string,
   safeSearch: boolean
): string => {

   const baseUrl = 'https://pixabay.com/api/?'
   const queryParams = new URLSearchParams()

   queryParams.append('key', apiKey)
   if (query) queryParams.append('q', query)
   if (id) queryParams.append('id', id)
   if (orientation) queryParams.append('orientation', orientation)
   if (category) queryParams.append('category', category)
   if (colour) queryParams.append('colors', colour)
   if (order) queryParams.append('order', order)
   if (safeSearch) queryParams.append('safesearch', safeSearch ? "true" : "false")

   const finalUrl = baseUrl + queryParams.toString()
   return finalUrl
}

type ImageProviderPropTypes = { children: ReactNode }

export const ImageProvider = ({ children }: ImageProviderPropTypes) => {
   const [images, setImages] = useState<imageType[]>([])
   const [imageTags, setImageTags] = useState<string[]>([])
   const [imageLoading, setimageLoading] = useState<boolean>(false)

   const { id, query, orientation, category, colour, order, safeSearch, change } = useParameter()

   useEffect(() => {
      console.log("image change:", change)
      setimageLoading(true)
      loadImages(query)
         .finally(() => setimageLoading(false))
   }, [change])

   const loadImages = async (query: string): Promise<void> => {
      const url = computeURL(query, id, orientation, category, colour, order, safeSearch)
      console.log("url:", url)

      return new Promise((resolve, reject) => {
         fetchImages(url)
            .then(newImages => {
               setImages(newImages)
               const uniqueTags: string[] = getUniqueTags(newImages)
               setImageTags(uniqueTags)
               console.log("images:", newImages)
               console.log("tags:", uniqueTags)
               resolve()
            })
            .catch(error => reject(error))
      })
   }

   return (
      <ImageContext.Provider
         value={{
            images,
            imageTags,
            loadImages,
            imageLoading,
         }}
      >
         {children}
      </ImageContext.Provider>
   )
}