import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ProfileImage from "../assets/profile-image.svg"
import ProfileIcon from "../assets/profile-icon.svg"
import SafeIcon from "../assets/safe-icon.svg"
import LogoutIcon from "../assets/logout-icon.svg"
import DarkModeIcon from "../assets/dark-mode-icon.svg"
import MenuIcon from "../assets/menu-icon.svg"
import { useParameter } from '../hooks/useParameter'
import { useAlert } from '../hooks/useAlert'
import { useTheme } from '../hooks/useTheme'

function SettingsDropdown() {
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const timeout = useRef<number | null>(null)

   const { currentUser, logout, isAuthenticated } = useAuth()
   const { safeSearch, update } = useParameter()
   const { onSuccess, onError } = useAlert()
   const { theme, setTheme } = useTheme()

   const navigate = useNavigate()

   const handleLogoutClick = () => {
      if (isAuthenticated) {
         logout()
            .then(() => {
               navigate('/login')
               onSuccess('Logged out successfully!')
            })
            .catch(() => onError('Error logging out.'))
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

   const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTheme(e.target.checked ? "dark" : "light")
   }

   return (
      <section
         className="pr-1 sm:pr-2"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <button
            id="dropdownHoverButton"
            onClick={toggleDropdown}
            className=""
            type="button"
         >
            <div className="relative size-8 sm:size-10 flex justify-center items-center overflow-hidden rounded-full bg-white bg-opacity-70">
               {isAuthenticated
                  ? <img src={currentUser?.photoURL ?? ProfileImage} alt="profile-icon" className='border rounded-full w-full h-full' />
                  : <img src={MenuIcon} alt='menu-icon' className='size-6' />
               }
            </div>
         </button>

         {/* Dropdown menu */}
         {isOpen && (
            <section id="dropdownHover" className="absolute right-0 mt-4 mr-3 sm:mr-6 text-black bg-light dark:text-light dark:bg-dark border border-black dark:border-gray-700 rounded-md">
               <ul className="w-44 sm:w-48 text-sm divide-y divide divide-slate-400 dark:divide-gray-700">
                  {isAuthenticated && (
                     <li>
                        <a href="/user/saved" className="px-2 sm:px-4 sm:pl-3 sm:gap-3 py-2 sm:py-3 flex items-center gap-2 hover:bg-slate-300 dark:hover:bg-black rounded-t-md">
                           <img src={ProfileIcon} alt="profile-icon" className='size-5 dark:invert' />
                           Profile
                        </a>
                     </li>
                  )}
                  <li>
                     <div className="px-2 sm:px-4 sm:pl-3 sm:gap-3 py-2 sm:py-3 flex items-center gap-2 cursor-default">
                        <img src={SafeIcon} alt="safe-icon" className='size-5 dark:invert' />
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
                     <div className="px-2 sm:px-4 sm:pl-3 sm:gap-3 py-2 sm:py-3 flex items-center gap-2 cursor-default">
                        <img src={DarkModeIcon} alt="dark-mode-icon" className='size-5 dark:invert' />
                        Dark Mode
                        <input
                           type="checkbox"
                           name="theme-toggle"
                           id="theme-toggle"
                           className="ml-auto appearance-none h-fit w-8 bg-dark rounded-md p-1 cursor-pointer
                           before:block before:size-3 before:bg-light before:rounded before:border-none
                           before:transition-all before:duration-200 before:ease-linear
                           checked:before:translate-x-full checked:bg-light checked:before:bg-dark
                           transition-colors duration-200"
                           checked={theme === "dark"}
                           onChange={handleThemeChange}
                        />
                     </div>

                  </li>
                  {isAuthenticated && (
                     <li>
                        <button onClick={handleLogoutClick} className="group w-full text-left flex items-center gap-2 px-2 sm:px-4 sm:pl-3 sm:gap-3 py-2 sm:py-3 hover:text-white hover:bg-red-600 rounded-b-md">
                           <img src={LogoutIcon} alt="logout-icon" className='size-5 dark:invert group-hover:invert' />
                           Logout
                        </button>
                     </li>
                  )}
               </ul>
            </section>
         )}
      </section>
   )
}

export default SettingsDropdown
