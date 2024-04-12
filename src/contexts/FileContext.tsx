import { createContext, ReactNode, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { collection, doc, setDoc, getDocs, deleteDoc, DocumentData, QuerySnapshot } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../firebase-config"
import { imageType } from "./ImageContext"
import { videoType } from "./VideoContext"

type fileType = {
   id: string,
   type: "image" | "video",
   content: imageType | videoType,
   userId: string,
}

type FileContextType = {
   addFile: (type: "image" | "video", file: imageType | videoType, id: string) => Promise<void>
   getFiles: () => Promise<QuerySnapshot<DocumentData, DocumentData>>
   deleteFile: (fileId: string) => Promise<void>
   loadFiles: () => void
   storeProfile: (profilePic: File) => Promise<string>
   files: fileType[] | undefined
   fileLoading: boolean
}

const FileContextInitState: FileContextType = {
   addFile: (_type: "image" | "video", _file: imageType | videoType, _id: string) => Promise.reject(),
   getFiles: () => Promise.reject(),
   deleteFile: (_fileId: string) => Promise.reject(),
   loadFiles: () => { },
   storeProfile: (_profilePic: File) => Promise.reject(),
   files: [],
   fileLoading: false,
}

export const FileContext = createContext(FileContextInitState)

type FileProviderPropTypes = { children: ReactNode }

export const FileProvider = ({ children }: FileProviderPropTypes) => {
   const [files, setFiles] = useState<fileType[]>([])
   const [fileLoading, setFileLoading] = useState<boolean>(false)
   const { currentUser } = useAuth()

   const savedCollectionRef = collection(db, "saved")

   const getUserRef = (userId: string) => {
      if (!userId) return
      return doc(savedCollectionRef, userId)
   }

   const getUserFilesRef = (userId: string) => {
      const userRef = getUserRef(userId)
      return userRef ? collection(userRef, "files") : null
   }

   const storeProfile = async (profilePic: File): Promise<string> => {
      if (!currentUser) return Promise.reject()
      try {
         const storageRef = ref(storage, 'profile_pictures/' + currentUser.uid + '.jpg')
         await uploadBytes(storageRef, profilePic)
         const profilePicUrl = await getDownloadURL(storageRef)
         return profilePicUrl
      } catch (error) {
         return Promise.reject(error)
      }
   }

   const storeImage = async (file: imageType, id: string): Promise<fileType> => {
      if (!currentUser) return Promise.reject()
      try {
         const imageUrl = file.imageURL
         const response = await fetch(imageUrl)
         const imageData = await response.blob()
         const storageRef = ref(storage, 'images/' + id + '.jpg')

         let url: string

         try {
            url = await getDownloadURL(storageRef)
         } catch (error) {
            await uploadBytes(storageRef, imageData)
            url = await getDownloadURL(storageRef)
         }

         const newFile: fileType = {
            id: id.toString(),
            type: "image",
            content: { ...file, previewURL: url, imageURL: url },
            userId: currentUser.uid,
         }

         return newFile

      } catch (error) {
         return Promise.reject(error)
      }
   }

   const storeVideo = async (file: videoType, id: string): Promise<fileType> => {
      if (!currentUser) return Promise.reject()
      try {
         const thumbnailUrl = file.normal.thumbnail
         const videoUrl = file.small.videoURL

         const thumbnailResponse = await fetch(thumbnailUrl)
         const videoResponse = await fetch(videoUrl)

         const thumbnailData = await thumbnailResponse.blob()
         const videoData = await videoResponse.blob()

         const thumbnailStorageRef = ref(storage, 'videos/' + id + '-thumbnail.jpg')
         const videoStorageRef = ref(storage, 'videos/' + id + '.mp4')

         let newThumbnailUrl: string
         let newVideoUrl: string

         try {
            newThumbnailUrl = await getDownloadURL(thumbnailStorageRef)
            newVideoUrl = await getDownloadURL(videoStorageRef)
         } catch {
            await uploadBytes(thumbnailStorageRef, thumbnailData)
            await uploadBytes(videoStorageRef, videoData)
            newThumbnailUrl = await getDownloadURL(thumbnailStorageRef)
            newVideoUrl = await getDownloadURL(videoStorageRef)
         }

         const newFile: fileType = {
            id: id.toString(),
            type: "video",
            content: {
               ...file,
               normal: { thumbnail: newThumbnailUrl, videoURL: newVideoUrl },
               small: { thumbnail: newThumbnailUrl, videoURL: newVideoUrl },
            },
            userId: currentUser.uid,
         }

         return newFile

      } catch (error) {
         return Promise.reject(error)
      }
   }

   const addFile = async (type: "image" | "video", file: imageType | videoType, id: string): Promise<void> => {
      if (!currentUser) return Promise.reject()

      const userFilesRef = getUserFilesRef(currentUser.uid)
      if (!userFilesRef) return Promise.reject()

      try {
         if (type === "image") {
            const imageFileCount = files.filter(file => file.type === "image").length
            if (imageFileCount >= 5) return Promise.reject('Image saving limit reached! (5)')
            await storeImage(file as imageType, id)
               .then((newFile: fileType) => {
                  const fileRef = doc(userFilesRef, id.toString())
                  setDoc(fileRef, newFile)
                     .then(() => loadFiles())
               })
         }
         else {
            const videoFileCount = files.filter(file => file.type === "video").length
            if (videoFileCount >= 3) return Promise.reject('Video saving limit reached! (3)')
            await storeVideo(file as videoType, id)
               .then((newFile: fileType) => {
                  const fileRef = doc(userFilesRef, id.toString())
                  setDoc(fileRef, newFile)
                     .then(() => loadFiles())
               })
         }
      }
      catch {
         return Promise.reject('Error saving file.')
      }
   }

   const getFiles = () => {
      if (!currentUser) return Promise.reject()
      const userFilesRef = getUserFilesRef(currentUser.uid)
      if (!userFilesRef) return Promise.reject()
      return getDocs(userFilesRef)
   }

   const deleteFile = async (fileId: string) => {

      if (!currentUser) return Promise.reject()
      const userFilesRef = getUserFilesRef(currentUser.uid)
      if (!userFilesRef) return Promise.reject()
      const fileRef = doc(userFilesRef, fileId.toString())

      await deleteDoc(fileRef)
      loadFiles()
      return Promise.resolve()

      // CODE FOR DELETING THE FILES FROM STORAGE TOO
      // try {
      //    if (type === "image") {
      //       const storageRef = ref(storage, 'images/' + fileId + '.jpg')
      //       await deleteObject(storageRef)
      //    }
      //    else {
      //       const thumbnailStorageRef = ref(storage, 'videos/' + fileId + '-thumbnail.jpg')
      //       const videoStorageRef = ref(storage, 'videos/' + fileId + '.mp4')
      //       await deleteObject(thumbnailStorageRef)
      //       await deleteObject(videoStorageRef)
      //    }

      //    return Promise.resolve()
      // }
      // catch {
      //    return Promise.reject('Error deleting file from storage.')
      // }
   }

   const loadFiles = () => {
      if (!currentUser) return setFiles([])
      setFileLoading(true)
      getFiles()
         .then((querySnapshot) => {
            const newFiles: any[] = []
            querySnapshot.forEach(file => newFiles.push(file.data() as fileType))
            setFiles(newFiles)
         })
         .finally(() => setFileLoading(false))
   }

   useEffect(() => {
      return loadFiles()
   }, [currentUser])

   const value = {
      addFile,
      getFiles,
      deleteFile,
      loadFiles,
      storeProfile,
      files,
      fileLoading,
   }

   return (
      <FileContext.Provider value={value}>
         {children}
      </FileContext.Provider>
   )
}
