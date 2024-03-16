import { createContext, ReactNode, useReducer } from "react"


const QueryContextInitState = {
   key: "",
   query: "",
   type: "image",
   id: "",
   orientation: "all",
   category: "",
   colors: "",
   order: "popular",
   update: (_parameter: REDUCER_ACTION_TYPE, _value: string) => { }
}

export const QueryContext = createContext(QueryContextInitState)

type StateType = {
   key: string,
   query: string,
   id: string,
   type: string,
   orientation: string,
   category: string,
   colors: string,
   order: string,
}

const enum REDUCER_ACTION_TYPE {
   KEY,
   QUERY,
   ID,
   TYPE,
   ORIENTATION,
   CATEGORY,
   COLORS,
   ORDER,
}

const defaultState: StateType = {
   key: "",
   query: "",
   id: "",
   type: "image",
   orientation: "all",
   category: "",
   colors: "",
   order: "popular",
}

const initState: StateType = defaultState

type ReducerAction = {
   type: REDUCER_ACTION_TYPE
   payload: string
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
   switch (action.type) {
      case REDUCER_ACTION_TYPE.KEY:
         return { ...state, key: action.payload ?? defaultState.key }
      case REDUCER_ACTION_TYPE.QUERY:
         return { ...state, query: action.payload ?? defaultState.query }
      case REDUCER_ACTION_TYPE.ID:
         return { ...state, id: action.payload ?? defaultState.id }
      case REDUCER_ACTION_TYPE.TYPE:
         return { ...state, type: action.payload ?? defaultState.type }
      case REDUCER_ACTION_TYPE.ORIENTATION:
         return { ...state, orientation: action.payload ?? defaultState.orientation }
      case REDUCER_ACTION_TYPE.CATEGORY:
         return { ...state, category: action.payload ?? defaultState.category }
      case REDUCER_ACTION_TYPE.COLORS:
         return { ...state, colors: action.payload ?? defaultState.colors }
      case REDUCER_ACTION_TYPE.ORDER:
         return { ...state, order: action.payload ?? defaultState.order }
      default:
         throw new Error("Reducer action type doesn't match.")
   }
}

type QueryProviderPropTypes = { children: ReactNode }
export const QueryProvider = ({ children }: QueryProviderPropTypes) => {
   const [state, dispatch] = useReducer(reducer, initState)

   const update = (parameter: REDUCER_ACTION_TYPE, value: string) => {
      dispatch({
         type: parameter,
         payload: value,
      })
   }
   return (
      <QueryContext.Provider
         value={{
            key: state.key,
            query: state.query,
            id: state.id,
            type: state.type,
            orientation: state.orientation,
            category: state.category,
            colors: state.colors,
            order: state.order,
            update: update,
         }}
      >
         {children}
      </QueryContext.Provider>
   )
}