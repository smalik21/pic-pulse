import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import SettingsDropdown from "./SettingsDropdown"

const PageOptions = () => {

   const { isAuthenticated } = useAuth()
   const navigate = useNavigate()

   const handleLoginClick = () => {
      navigate('/login')
   }

   return (
      <section className="space-x-4 sm:space-x-7 flex items-center" id="page-options">
         {/* <input
            type="checkbox"
            name="theme-toggle"
            id="theme-toggle"
            className="hidden sm:inline appearance-none h-fit w-9 bg-light rounded-md p-1
                     before:block before:size-3.5 before:bg-dark before:rounded before:border-none
                     before:transition-all before:duration-200 before:ease-linear
                     checked:before:translate-x-full checked:bg-dark checked:before:bg-light
                     transition-colors duration-200"
            disabled
         /> */}
         {/* <button className="hidden sm:inline" disabled>Upload</button> */}
         {!isAuthenticated && (
            <button
               onClick={handleLoginClick}
               className="px-4 py-1 sm:py-2 text-sm flex items-center rounded-md text-black bg-white hover:bg-slate-200 active:bg-slate-300"
            >
               Login
            </button>
         )}
         <SettingsDropdown />
      </section>
   )
}

export default PageOptions
