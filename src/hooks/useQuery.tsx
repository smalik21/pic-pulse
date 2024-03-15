import { useContext } from "react"
import { QueryContext } from "../contexts/QueryContext"

export const useQuery = () => useContext(QueryContext)