import { ReactNode, createContext, useState } from "react";

const ImageContextInitState = {
   images: [{}],
   imageTags: [""],
   updateImages: (_newImages: imageType[]) => { },
   updateImageTags: (_newImageTags: string[]) => { },
}

export const ImageContext = createContext(ImageContextInitState)

export type imageType = {
   previewURL: string,
   imageURL: string,
}

type ImageProviderPropTypes = { children: ReactNode }

export const ImageProvider = ({ children }: ImageProviderPropTypes) => {
   const [images, setImages] = useState<imageType[]>([])
   const [imageTags, setImageTags] = useState<string[]>([])

   const updateImages = (newImages: imageType[]) => setImages(newImages)
   const updateImageTags = (newImageTags: string[]) => setImageTags(newImageTags)

   return (
      <ImageContext.Provider
         value={{
            images,
            imageTags,
            updateImages,
            updateImageTags,
         }}
      >
         {children}
      </ImageContext.Provider>
   )
}