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
