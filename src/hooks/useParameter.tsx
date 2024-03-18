import { useContext } from "react"
import { ParameterContext } from "../contexts/ParameterContext"

export const useParameter = () => useContext(ParameterContext)