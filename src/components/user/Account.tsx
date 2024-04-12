import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useAlert } from "../../hooks/useAlert"
import { EmailAuthProvider, reauthenticateWithCredential, getIdToken } from "firebase/auth"
import EditIcon from "../../assets/edit-icon.svg"
import { toast } from "react-toastify"
import Spinner from "../Spinner"

type AccountPropTypes = {
   updatedInfo: () => void
}

const Account = ({ updatedInfo }: AccountPropTypes) => {

   const nameRef = useRef<HTMLInputElement>(null)
   const emailRef = useRef<HTMLInputElement>(null)
   const newPassRef = useRef<HTMLInputElement>(null)
   const confirmPassRef = useRef<HTMLInputElement>(null)
   const bottomRef = useRef<HTMLDivElement>(null)

   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [isFormActive, setIsFormActive] = useState<boolean>(false)

   const navigate = useNavigate()

   const { currentUser, update_Profile, update_Password, delete_User } = useAuth()
   const { onError } = useAlert()

   const handleEdit = () => setIsFormActive(true)
   const handleCancel = () => setIsFormActive(false)

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const name = nameRef.current?.value.trim() || ''
      const newPassword = newPassRef.current?.value || ''
      const confirmPassword = confirmPassRef.current?.value || ''

      // Password validation
      if (newPassword && newPassword.length < 8) {
         onError('New password should be at least 8 characters long.')
         newPassRef.current?.focus()
         return
      }

      if (newPassword && confirmPassword !== newPassword) {
         onError('New passwords do not match.')
         newPassRef.current?.focus()
         return
      }

      setIsLoading(true)

      const profileUpdatePromise = new Promise<void>(async (resolve, reject) => {
         try {
            if (!currentUser || !currentUser.email) return

            const token = await getIdToken(currentUser, true)

            // Re-authenticate the user if required
            if (!token) {
               const currentPassword = prompt('Please enter your current password:')
               if (!currentPassword) return
               const credential = EmailAuthProvider.credential(currentUser.email, currentPassword)
               await reauthenticateWithCredential(currentUser, credential)
            }

            if (name && name !== currentUser?.displayName) await update_Profile({ displayName: name })
            if (newPassword) await update_Password(newPassword)

            setIsFormActive(false)
            updatedInfo()
            resolve()
         }
         catch { reject() }
         finally { setIsLoading(false) }
      })

      toast.promise(
         profileUpdatePromise,
         {
            pending: 'Saving changes...',
            success: 'Profile updated successfully!',
            error: 'Error updating profile.'
         }
      )
   }

   const handleDeleteAccount = () => {
      const accept = window.confirm('Are you sure you want to delete your account?')
      if (!accept) return

      const accountDeletePromise = new Promise<void>((resolve, reject) => {
         delete_User()
            .then(() => {
               navigate('/signup')
               resolve()
            })
            .catch(() => reject())
      })

      toast.promise(
         accountDeletePromise,
         {
            pending: 'Deleting account...',
            success: 'Account deleted successfully!',
            error: 'Error deleting account.'
         }
      )
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
      }
   }

   useEffect(() => {
      if (isFormActive) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
   }, [isFormActive])

   return (
      <main className="p-4 sm:p-8 sm:mx-8 flex justify-center border-t-2 sm:border-2 border-black sm:rounded-xl">
         {isFormActive ? (
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col sm:gap-2 border-black">
               <div className="mb-4">
                  <label htmlFor="fullName" className="block font-bold mb-2">
                     Full Name
                  </label>
                  <input
                     type="text"
                     id="fullName"
                     className="w-full px-4 py-2 border border-slate-400 rounded-lg"
                     placeholder="Enter full name"
                     defaultValue={currentUser?.displayName || ''}
                     ref={nameRef}
                     disabled={isLoading}
                     onKeyDown={handleKeyDown}
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="email" className="block font-bold mb-2">
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     className="w-full px-4 py-2 border border-slate-400 rounded-lg"
                     placeholder="Enter email"
                     defaultValue={currentUser?.email || ''}
                     ref={emailRef}
                     disabled
                     onKeyDown={handleKeyDown}
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="new-password" className="block font-bold mb-2">
                     New Password
                  </label>
                  <input
                     type="password"
                     id="new-password"
                     className="w-full px-4 py-2 border border-slate-400 rounded-lg"
                     placeholder="Enter new password"
                     ref={newPassRef}
                     disabled={isLoading || currentUser?.emailVerified}
                     onKeyDown={handleKeyDown}
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="confirm-password" className="block font-bold mb-2">
                     Confirm Password
                  </label>
                  <input
                     type="password"
                     id="confirm-password"
                     className="w-full px-4 py-2 border border-slate-400 rounded-lg"
                     placeholder="Confirm new password"
                     ref={confirmPassRef}
                     disabled={isLoading || currentUser?.emailVerified}
                     onKeyDown={handleKeyDown}
                  />
               </div>

               <section className="py-4 flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <button
                     onClick={handleCancel}
                     className="w-full disabled:cursor-default disabled:opacity-50 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                     disabled={isLoading}
                  >
                     Cancel
                  </button>

                  <button
                     type="submit"
                     className="w-full disabled:cursor-default bg-green-700 hover:bg-green-800 active:bg-green-900 text-white font-bold py-2 px-4 rounded"
                     disabled={isLoading}
                  >
                     {!isLoading ? <>Save Changes</> : <Spinner />}
                  </button>
               </section>
               <div ref={bottomRef}></div>
            </form>
         ) : (
            <article id="account-info" className="w-full max-w-sm flex flex-col items-start gap-4 sm:gap-4 border-red-600">
               <button
                  onClick={handleEdit}
                  className="py-1 px-2 sm:p-2 ml-auto sm:absolute sm:right-16 flex items-center gap-1 border border-black rounded-lg hover:bg-orange-50 active:bg-orange-100"
               >
                  <img src={EditIcon} alt="edit-icon" className="size-5" />
                  Edit
               </button>
               <section id="user-name" className="w-full px-4 py-1 sm:py-2 border border-slate-400 rounded-lg">
                  <h1 className="font-bold">Full Name</h1>
                  <p className="text-slate-700 truncate">{currentUser?.displayName || <em className="text-red-400">unknown</em>}</p>
               </section>
               <section id="email" className="w-full px-4 py-1 sm:py-2 border border-slate-400 rounded-lg">
                  <h1 className="font-bold">Email</h1>
                  <p className="text-slate-700 truncate">{currentUser?.email || 'unknown'}</p>
               </section>
               <section id="password" className="w-full px-4 py-1 sm:py-2 border border-slate-400 rounded-lg">
                  <h1 className="font-bold">Password</h1>
                  <p className="text-slate-700 truncate">{'*'.repeat(8)}</p>
               </section>
               <section id="delete-account" className="w-full mt-8 flex">
                  <button onClick={handleDeleteAccount} className="mx-auto px-6 py-2 text-sm sm:text-base text-white bg-red-700 hover:bg-red-600 active:bg-red-800 rounded-md">
                     Delete my account
                  </button>
               </section>
            </article>
         )}
      </main>
   )
}

export default Account
