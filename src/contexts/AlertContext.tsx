import { ReactNode, createContext } from 'react'
import { toast, Bounce, Id } from "react-toastify"

type AlertContextType = {
   onSuccess: (message: string) => Id
   onError: (message: string) => Id
   onWarn: (message: string) => Id
   onInfo: (message: string) => Id
   onAlert: (message: string) => Id
}

const AlertContextInitState: AlertContextType = {
   onSuccess: (_message: string) => '',
   onError: (_message: string) => '',
   onWarn: (_message: string) => '',
   onInfo: (_message: string) => '',
   onAlert: (_message: string) => '',
}

export const AlertContext = createContext<AlertContextType>(AlertContextInitState)

const onSuccess = (message: string) => toast.success(message, {
   position: "top-right",
   autoClose: 1000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: false,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
})

const onError = (message: string) => toast.error(message, {
   position: "top-right",
   autoClose: 1000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: false,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
})

const onInfo = (message: string) => toast.info(message, {
   position: "top-right",
   autoClose: 1000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: false,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
})

const onWarn = (message: string) => toast.warn(message, {
   position: "top-right",
   autoClose: 1000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: false,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
})

const onAlert = (message: string) => toast(message, {
   position: "top-right",
   autoClose: 1000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: false,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
})

type AlertProviderPropTypes = {
   children: ReactNode
}

export const AlertProvider = ({ children }: AlertProviderPropTypes) => {

   const value: AlertContextType = {
      onSuccess,
      onError,
      onWarn,
      onInfo,
      onAlert
   }

   return (
      <AlertContext.Provider value={value}>
         {children}
      </AlertContext.Provider>
   )
}