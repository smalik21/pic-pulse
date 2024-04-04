import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ProfileImage from "../assets/profile-image.svg"
import ProfileIcon from "../assets/profile-icon.svg"
import SafeIcon from "../assets/safe-icon.svg"
import LogoutIcon from "../assets/logout-icon.svg"
import { useParameter } from '../hooks/useParameter'

function SettingsDropdown() {
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const timeout = useRef<number | null>(null)

   const { logout, isAuthenticated } = useAuth()
   const { safeSearch, update } = useParameter()

   const navigate = useNavigate()

   const handleLogoutClick = () => {
      if (isAuthenticated) {
         logout()
            .then(() => navigate('/login'))
      }
   }

   const handleSafeSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      update("SAFESEARCH", e.target.checked)
   }

   const toggleDropdown = () => {
      setIsOpen(!isOpen)
   }
   const handleMouseEnter = () => {
      clearTimeout(timeout.current!)
      setIsOpen(true)
   }
   const handleMouseLeave = () => {
      timeout.current = window.setTimeout(() => {
         setIsOpen(false)
      }, 200)
   }

   return (
      <section
         className="-mb-2 sm:pr-2"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <button
            id="dropdownHoverButton"
            onClick={toggleDropdown}
            className=""
            type="button"
         >
            <div className="relative size-8 sm:size-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
               <img src={ProfileImage} alt="profile-img" className='' />
            </div>
         </button>

         {/* Dropdown menu */}
         {isOpen && (
            <section id="dropdownHover" className="absolute right-0 mt-2 mr-2 sm:mr-6 text-black bg-white rounded-md">
               <ul className="w-44 sm:w-48 text-sm divide-y divide-slate-400">
                  <li>
                     <a href="/user/saved" className="px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2 hover:bg-slate-300 rounded-t-md">
                        <img src={ProfileIcon} alt="profile-icon" className='size-5' />
                        Profile
                     </a>
                  </li>
                  <li>
                     <div className="px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2 cursor-default">
                        <img src={SafeIcon} alt="safe-icon" className='size-5' />
                        SafeSearch
                        <input
                           type="checkbox"
                           name="theme-toggle"
                           id="theme-toggle"
                           checked={safeSearch}
                           onChange={handleSafeSearchChange}
                           className="ml-auto appearance-none h-fit w-8 bg-red-700 rounded-md p-1 cursor-pointer
                           before:block before:size-3 before:bg-light before:rounded before:border-none
                           before:transition-all before:duration-200 before:ease-linear
                           checked:before:translate-x-full checked:bg-green-700
                           transition-colors duration-200"
                        />
                     </div>
                  </li>
                  <li>
                     <button onClick={handleLogoutClick} className="w-full text-left flex items-center gap-2 px-2 sm:px-4 py-2 sm:py-3 hover:bg-red-300 rounded-b-md">
                        <img src={LogoutIcon} alt="logout-icon" className='size-5' />
                        Logout
                     </button>
                  </li>
               </ul>
            </section>
         )}
      </section>
   )
}

export default SettingsDropdown
