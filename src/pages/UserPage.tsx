import { Route, Routes, useNavigate, NavLink, Navigate } from "react-router-dom"
import PageTitle from "../components/PageTitle"
import { useAuth } from "../hooks/useAuth"
import ProfileDefaultImg from "../assets/profile-image.svg"
import Saved from "../components/Saved"
import Account from "../components/Account"

const UserPage = () => {
   const { isAuthenticated, logout } = useAuth()
   const navigate = useNavigate()

   const handleLogoutClick = () => {
      if (isAuthenticated) {
         logout()
            .then(() => navigate('/login'))
      }
   }

   return (
      <>
         <header id="authHeader" className="py-3 p-2 sm:p-4 text-white bg-heroSection bg-cover">
            <section className="w-full flex justify-between">
               <PageTitle />
               <button onClick={handleLogoutClick} className="px-4 py-1 sm:py-2 text-sm flex items-center rounded-md text-white bg-red-700 hover:bg-red-500 active:bg-red-900">
                  Logout
               </button>
            </section>
            <section id="profile" className="w-full py-4 sm:py-8 flex justify-center">
               <figure className="flex flex-col gap-2 sm:gap-4 sm:text-lg items-center">
                  <img
                     id="profile-img"
                     src={ProfileDefaultImg}
                     className=""
                  />
                  <p>Profile Name</p>
               </figure>
            </section>
         </header>
         <main className="pb-4 sm:pb-8">
            <nav className="mt-4 sm:mt-8">
               <ul className="px-0 sm:px-16 flex justify-center sm:justify-start gap-4">
                  {/* <li>
                     <NavLink
                        to={`/user/profile`}
                        className={({ isActive }) =>
                           `block px-4 py-2 text-sm sm:text-md sm:px-6 sm:py-3
                           ${isActive ? 'text-white bg-dark rounded-t-lg' : ''
                           }`
                        }
                     >
                        Profile
                     </NavLink>
                  </li> */}
                  <li>
                     <NavLink
                        to={`/user/saved`}
                        className={({ isActive }) =>
                           `block px-4 py-2 text-sm sm:text-md sm:px-6 sm:py-3
                           ${isActive ? 'text-white bg-dark rounded-t-lg' : ''
                           }`
                        }
                     >
                        Saved
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to={`/user/account`}
                        className={({ isActive }) =>
                           `block px-4 py-2 text-sm sm:text-md sm:px-6 sm:py-3
                                    ${isActive ? 'text-white bg-dark rounded-t-lg' : ''
                           }`
                        }
                     >
                        Account
                     </NavLink>
                  </li>
               </ul>
            </nav>
            <Routes>
               {/* <Route path="/profile" element={<p className="text-xl text-red-300">profile</p>} /> */}
               <Route path="/saved" element={<Saved />} />
               <Route path="/account" element={<Account />} />
               <Route path="*" element={<Navigate to={'/user/saved'} />} />
            </Routes>
         </main>
      </>
   )
}

export default UserPage
