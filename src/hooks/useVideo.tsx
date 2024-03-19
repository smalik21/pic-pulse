import { useContext } from "react"
import { VideoContext } from "../contexts/VideoContext"

export const useVideo = () => useContext(VideoContext)