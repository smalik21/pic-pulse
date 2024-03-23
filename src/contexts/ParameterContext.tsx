import { createContext, ReactNode, useReducer, useState } from "react"

type StateType = {
   query: string,
   id: string,
   type: string,
   orientation: string,
   category: string,
   colour: string,
   order: string,
}

const defaultState: StateType = {
   query: "",
   id: "",
   type: "image",
   orientation: "",
   category: "",
   colour: "",
   order: "popular",
}

const initState: StateType = defaultState

const ParameterContextInitState = {
   ...initState,
   state: initState,
   update: (_parameter: REDUCER_ACTION_TYPE, _value: string) => { },
   resetParameters: () => { },
   change: false,
   resetChange: () => { },
   reset: true,
}

export const ParameterContext = createContext(ParameterContextInitState)

export type REDUCER_ACTION_TYPE = "QUERY" | "ID" | "TYPE" | "ORIENTATION" | "CATEGORY" | "COLOUR" | "ORDER" | "RESET"

type ReducerAction = {
   type: REDUCER_ACTION_TYPE
   payload?: string
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
   switch (action.type) {
      case "QUERY":
         return { ...state, query: action.payload ?? defaultState.query }
      case "ID":
         return { ...state, id: action.payload ?? defaultState.id }
      case "TYPE":
         return { ...state, type: action.payload ?? defaultState.type }
      case "ORIENTATION":
         return { ...state, orientation: action.payload ?? defaultState.orientation }
      case "CATEGORY":
         return { ...state, category: action.payload ?? defaultState.category }
      case "COLOUR":
         return { ...state, colour: action.payload ?? defaultState.colour }
      case "ORDER":
         return { ...state, order: action.payload ?? defaultState.order }
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

   const update = (parameter: REDUCER_ACTION_TYPE, value: string): void => {
      dispatch({
         type: parameter,
         payload: value,
      })
      console.log("State:", state)
      setChange(true)
      setReset(false)
   }

   const resetParameters = (): void => {
      dispatch({ type: "RESET" })
      setChange(true)
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
            state: state,
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