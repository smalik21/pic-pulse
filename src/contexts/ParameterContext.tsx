import { createContext, ReactNode, useReducer } from "react"

const ParameterContextInitState = {
   query: "",
   type: "image",
   id: "",
   orientation: "",
   category: "",
   colour: "",
   order: "popular",
   update: (_parameter: REDUCER_ACTION_TYPE, _value: string) => { }
}

export const ParameterContext = createContext(ParameterContextInitState)

type StateType = {
   query: string,
   id: string,
   type: string,
   orientation: string,
   category: string,
   colour: string,
   order: string,
}

export type REDUCER_ACTION_TYPE = "QUERY" | "ID" | "TYPE" | "ORIENTATION" | "CATEGORY" | "COLOUR" | "ORDER"

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

type ReducerAction = {
   type: REDUCER_ACTION_TYPE
   payload: string
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
      default:
         throw new Error("Reducer action type doesn't match.")
   }
}

type ParameterProviderPropTypes = { children: ReactNode }
export const ParameterProvider = ({ children }: ParameterProviderPropTypes) => {
   const [state, dispatch] = useReducer(reducer, initState)

   const update = (parameter: REDUCER_ACTION_TYPE, value: string) => {
      dispatch({
         type: parameter,
         payload: value,
      })
      console.log("State:", state)
   }

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
            update: update,
         }}
      >
         {children}
      </ParameterContext.Provider>
   )
}