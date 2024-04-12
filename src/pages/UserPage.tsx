import { useEffect, useState } from "react"
import { Route, Routes, useNavigate, NavLink, Navigate } from "react-router-dom"
import PageTitle from "../components/PageTitle"
import { useAuth } from "../hooks/useAuth"
import { useAlert } from "../hooks/useAlert"
import ProfileDefaultImg from "../assets/profile-image.svg"
import Saved from "../components/user/Saved"
import Account from "../components/user/Account"
import LogoutIcon from "../assets/logout-icon.svg"
import ProfilePictureUpload from "../components/user/ProfilePictureUpload"

const UserPage = () => {

   const [uploading, setUploading] = useState<boolean>(false)

   const [userName, setUserName] = useState<string>('')
   const [userProfile, setUserProfile] = useState<string>('')

   const { currentUser, isAuthenticated, logout } = useAuth()
   const { onSuccess, onError } = useAlert()
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

   useEffect(() => {
      setUserName(currentUser?.displayName || '')
      setUserProfile(currentUser?.photoURL || '')
   }, [currentUser?.displayName, currentUser?.photoURL])

   const updatedInfo = () => setUserName(currentUser?.displayName || '')

   return (
      <>
         <header id="authHeader" className="py-3 p-2 sm:p-4 text-white bg-heroSection bg-cover">
            <section className="w-full flex justify-between">
               <PageTitle />
               <button
                  onClick={handleLogoutClick}
                  className="px-3 pl-2 sm:px-4 sm:pl-3 py-1 sm:py-2 text-xs sm:text-sm flex items-center gap-1 rounded-md text-white border border-white hover:border-none hover:bg-red-600 active:bg-red-800"
               >
                  <img src={LogoutIcon} alt="logout-icon" className="invert size-5" />
                  Logout
               </button>
            </section>
            <section id="profile" className="w-full pt-8 pb-3 sm:pb-6 flex justify-center">
               <figure className="flex flex-col gap-5 sm:gap-6 sm:text-lg items-center">
                  <ProfilePictureUpload
                     setUserProfile={setUserProfile}
                     setUploading={setUploading}
                     uploading={uploading}
                  />
                  <span className="size-24 sm:size-32 rounded-full">
                     <img
                        id="profile-img"
                        src={userProfile || ProfileDefaultImg}
                        className="w-full h-full border rounded-full aria-disabled:animate-pulse"
                        aria-disabled={uploading}
                     />
                  </span>
                  <p className="font-search font-bold sm:text-xl">{userName}</p>
               </figure>
            </section>
         </header >
         <main className="pb-4 sm:pb-8">
            <nav className="mt-4 sm:mt-8">
               <ul className="px-0 sm:px-16 flex justify-center sm:justify-start gap-4">
                  <li>
                     <NavLink
                        to={`/user/saved`}
                        className={({ isActive }) =>
                           `block px-4 py-2 text-sm sm:text-base sm:px-6 sm:py-3 font-semibold border border-b-0 border-dark rounded-t-lg
                           ${isActive ? 'text-white bg-dark' : ''
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
                           `block px-4 py-2 text-sm sm:text-base sm:px-6 sm:py-3 font-semibold border border-b-0 border-dark rounded-t-lg
                           ${isActive ? 'text-white bg-dark' : ''
                           }`
                        }
                     >
                        Account
                     </NavLink>
                  </li>
               </ul>
            </nav>
            <Routes>
               <Route path="/saved" element={<Saved />} />
               <Route path="/account" element={<Account updatedInfo={updatedInfo} />} />
               <Route path="*" element={<Navigate to={'/user/saved'} />} />
            </Routes>
         </main>
      </>
   )
}

export default UserPage
