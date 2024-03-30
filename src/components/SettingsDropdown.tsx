import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function SettingsDropdown() {
   const [isOpen, setIsOpen] = useState(false)
   const timeout = useRef<number | null>(null)

   const { logout, isAuthenticated } = useAuth()
   const navigate = useNavigate()

   const handleLogoutClick = () => {
      if (isAuthenticated) {
         logout()
            .then(() => navigate('/login'))
      }
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
         className="-mb-2"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <button
            id="dropdownHoverButton"
            onClick={toggleDropdown}
            className=""
            type="button"
         >
            <div className="relative size-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
               <svg className="absolute size-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
         </button>

         {/* Dropdown menu */}
         {isOpen && (
            <section id="dropdownHover" className="absolute right-0 mt-2 mr-2 sm:mr-4 text-black bg-white">
               <ul className="w-32 sm:w-36 text-sm sm:text-md divide-y divide-gray-700">
                  <li>
                     <a href="#" className="block px-4 py-2 hover:bg-gray-400">
                        Profile
                     </a>
                  </li>
                  <li>
                     <a href="#" className="block px-4 py-2 hover:bg-gray-400">
                        SafeSearch
                     </a>
                  </li>
                  <li>
                     <button onClick={handleLogoutClick} className="w-full text-left px-4 py-2 bg-red-300 hover:bg-gray-400">
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
