import { useContext } from "react"
import { FileContext } from "../contexts/FileContext"

export const useFile = () => useContext(FileContext)