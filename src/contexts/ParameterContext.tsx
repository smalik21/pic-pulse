import { createContext, ReactNode, useReducer, useState } from "react"

type StateType = {
   query: string
   id: string
   type: string
   orientation: string
   category: string
   colour: string
   order: string
   safeSearch: boolean
}

const defaultState: StateType = {
   query: "",
   id: "",
   type: "image",
   orientation: "",
   category: "",
   colour: "",
   order: "popular",
   safeSearch: true,
}

const initState: StateType = defaultState

interface ParameterContextType extends StateType {
   update: (parameter: REDUCER_ACTION_TYPE, value: string | boolean) => void
   resetParameters: () => void
   change: boolean
   resetChange: () => void
   reset: boolean
}

const ParameterContextInitState: ParameterContextType = {
   ...initState,
   update: () => { },
   resetParameters: () => { },
   change: false,
   resetChange: () => { },
   reset: true,
}


export const ParameterContext = createContext<ParameterContextType>(ParameterContextInitState)

export type REDUCER_ACTION_TYPE = "QUERY" | "ID" | "TYPE" | "ORIENTATION" | "CATEGORY" | "COLOUR" | "ORDER" | "SAFESEARCH" | "RESET"

type ReducerAction = {
   type: REDUCER_ACTION_TYPE
   payload?: string | boolean,
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
   switch (action.type) {
      case "QUERY":
         return { ...state, query: action.payload as string ?? defaultState.query }
      case "ID":
         return { ...state, id: action.payload as string ?? defaultState.id }
      case "TYPE":
         return { ...state, type: action.payload as string ?? defaultState.type }
      case "ORIENTATION":
         return { ...state, orientation: action.payload as string ?? defaultState.orientation }
      case "CATEGORY":
         return { ...state, category: action.payload as string ?? defaultState.category }
      case "COLOUR":
         return { ...state, colour: action.payload as string ?? defaultState.colour }
      case "ORDER":
         return { ...state, order: action.payload as string ?? defaultState.order }
      case "SAFESEARCH":
         return { ...state, safeSearch: action.payload as boolean ?? defaultState.order }
      case "RESET":
         return defaultState
      default:
         throw new Error("Reducer action type doesn't match.")
   }
}

type ParameterProviderPropTypes = { children: ReactNode }
export const ParameterProvider = ({ children }: ParameterProviderPropTypes) => {
   const [state, dispatch] = useReducer(reducer, initState)
   const [change, setChange] = useState<boolean>(false)
   const [reset, setReset] = useState<boolean>(true)

   const update = (parameter: REDUCER_ACTION_TYPE, value: string | boolean): void => {
      dispatch({
         type: parameter,
         payload: value,
      })
      console.log("State:", state)
      if (parameter !== "TYPE") {
         setChange(!change)
         setReset(false)
      }
   }

   const resetParameters = (): void => {
      dispatch({ type: "RESET" })
      setChange(!change)
      setReset(true)
   }

   const resetChange = (): void => setChange(false)

   return (
      <ParameterContext.Provider
         value={{
            query: state.query,
            id: state.id,
            type: state.type,
            orientation: state.orientation,
            category: state.category,
            colour: state.colour,
            order: state.order,
            safeSearch: state.safeSearch,
            update: update,
            resetParameters: resetParameters,
            change: change,
            resetChange: resetChange,
            reset: reset,
         }}
      >
         {children}
      </ParameterContext.Provider>
   )
}