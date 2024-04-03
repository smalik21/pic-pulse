import { createContext, ReactNode, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { collection, doc, setDoc, getDocs, deleteDoc, DocumentData, QuerySnapshot } from "firebase/firestore"
import { db } from "../firebase-config"
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
   files: fileType[] | undefined
   fileLoading: boolean
}

const FileContextInitState: FileContextType = {
   addFile: (_type: "image" | "video", _file: imageType | videoType, _id: string) => Promise.reject(),
   getFiles: () => Promise.reject(),
   deleteFile: (_fileId: string) => Promise.reject(),
   loadFiles: () => { },
   files: [],
   fileLoading: false,
}

export const FileContext = createContext(FileContextInitState)

type FileProviderPropTypes = { children: ReactNode }

export const FileProvider = ({ children }: FileProviderPropTypes) => {
   const [files, setFiles] = useState<fileType[]>()
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

   const addFile = (type: "image" | "video", file: imageType | videoType, id: string) => {
      if (!currentUser) return Promise.reject()
      const newFile: fileType = {
         id: id.toString(),
         type,
         content: file,
         userId: currentUser.uid,
      }
      const userFilesRef = getUserFilesRef(currentUser.uid)
      if (!userFilesRef) return Promise.reject()

      // return addDoc(userFilesRef, newFile)

      const fileRef = doc(userFilesRef, id.toString())
      return setDoc(fileRef, newFile)
   }

   const getFiles = () => {
      if (!currentUser) return Promise.reject()
      const userFilesRef = getUserFilesRef(currentUser.uid)
      if (!userFilesRef) return Promise.reject()
      return getDocs(userFilesRef)
   }

   const deleteFile = (fileId: string) => {
      if (!currentUser) return Promise.reject()
      const userFilesRef = getUserFilesRef(currentUser.uid)
      if (!userFilesRef) return Promise.reject()
      const fileRef = doc(userFilesRef, fileId.toString())
      return deleteDoc(fileRef)
   }

   const loadFiles = () => {
      if (!currentUser) {
         setFiles([])
         return
      }
      setFileLoading(true)
      getFiles()
         .then((querySnapshot) => {
            const newFiles: any[] = []
            querySnapshot.forEach(file => newFiles.push(file.data() as fileType))
            setFiles(newFiles)
            console.log(newFiles)
         })
         .catch((error) => console.log(error))
         .finally(() => setFileLoading(false))
   }

   useEffect(() => {
      console.log(currentUser)
      return loadFiles()
   }, [currentUser])

   const value = {
      addFile,
      getFiles,
      deleteFile,
      loadFiles,
      files,
      fileLoading,
   }

   return (
      <FileContext.Provider value={value}>
         {children}
      </FileContext.Provider>
   )
}
