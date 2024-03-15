import { createContext, ReactNode, useReducer } from "react"

type StateType = {
   key: string,
   query: string,
   id: string,
   orientation: string,
   category: string,
   colors: string,
   order: string,
}

const enum REDUCER_ACTION_TYPE {
   KEY,
   QUERY,
   ID,
   ORIENTATION,
   CATEGORY,
   COLORS,
   ORDER,
}

const defaultState: StateType = {
   key: "",
   query: "",
   id: "",
   orientation: "all",
   category: "",
   colors: "",
   order: "popular",
}

const QueryContextInitState = {
   ...defaultState,
   update: (_parameter: REDUCER_ACTION_TYPE, _value: string) => { }
}

export const QueryContext = createContext(QueryContextInitState)

const initState: StateType = defaultState

type ReducerAction = {
   type: REDUCER_ACTION_TYPE
   payload: string
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
   switch (action.type) {
      case REDUCER_ACTION_TYPE.KEY:
         return { ...state, key: action.payload }
      case REDUCER_ACTION_TYPE.QUERY:
         return { ...state, query: action.payload }
      case REDUCER_ACTION_TYPE.ID:
         return { ...state, id: action.payload }
      case REDUCER_ACTION_TYPE.ORIENTATION:
         return { ...state, orientation: action.payload }
      case REDUCER_ACTION_TYPE.CATEGORY:
         return { ...state, category: action.payload }
      case REDUCER_ACTION_TYPE.COLORS:
         return { ...state, colors: action.payload }
      case REDUCER_ACTION_TYPE.ORDER:
         return { ...state, order: action.payload }
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