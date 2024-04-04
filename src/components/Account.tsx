import { useEffect, useRef, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { EmailAuthProvider, reauthenticateWithCredential, getIdToken } from "firebase/auth"

const Account = () => {

   const nameRef = useRef<HTMLInputElement>(null)
   const emailRef = useRef<HTMLInputElement>(null)
   const newPassRef = useRef<HTMLInputElement>(null)
   const confirmPassRef = useRef<HTMLInputElement>(null)

   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [isFormActive, setIsFormActive] = useState<boolean>(false)
   const { currentUser, update_Profile, update_Email, update_Password } = useAuth()

   // console.log(currentUser)

   const handleEdit = () => setIsFormActive(true)
   const handleCancel = () => setIsFormActive(false)

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const name = nameRef.current?.value.trim() || ''
      const email = emailRef.current?.value.trim() || ''
      const newPassword = newPassRef.current?.value || ''
      const confirmPassword = confirmPassRef.current?.value || ''

      // Email validation
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if (email && !emailRegex.test(email)) {
         alert('Please enter a valid email address.')
         emailRef.current?.focus()
         return
      }

      // Password validation
      if (newPassword && newPassword.length < 8) {
         alert('New password should be at least 8 characters long.')
         newPassRef.current?.focus()
         return
      }

      if (newPassword && confirmPassword !== newPassword) {
         alert('New passwords do not match.')
         newPassRef.current?.focus()
         return
      }

      setIsLoading(true)

      try {
         if (!currentUser || !currentUser.email) return

         const token = await getIdToken(currentUser, true);

         // Re-authenticate the user if required
         if (!token) {
            const currentPassword = prompt('Please enter your current password:');
            if (!currentPassword) return
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credential);
         }

         if (name && name !== currentUser?.displayName) await update_Profile({ displayName: name })
         if (email && email !== currentUser?.email) await update_Email(email)
         if (newPassword) await update_Password(newPassword)

         setIsFormActive(false)
      }
      catch (error) {
         console.log("Error updating profile setting:", error)
      }
      finally {
         setIsLoading(false)
      }
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
   };

   useEffect(() => console.log(currentUser))

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
                     disabled={isLoading}
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
                     disabled={isLoading}
                     onKeyDown={handleKeyDown}
                  />
               </div>

               <section className="py-4 flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <button
                     onClick={handleCancel}
                     className="w-full disabled:cursor-wait disabled:opacity-50 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                     disabled={isLoading}
                  >
                     Cancel
                  </button>

                  <button
                     type="submit"
                     className="w-full disabled:cursor-wait disabled:opacity-50 bg-green-700 hover:bg-green-800 active:bg-green-900 text-white font-bold py-2 px-4 rounded"
                     disabled={isLoading}
                  >
                     Save Changes
                  </button>
               </section>

            </form>
         ) : (
            <article id="account-info" className="w-full max-w-sm flex flex-col items-start gap-4 sm:gap-4 border-red-600">
               <button onClick={handleEdit} className="p-2 ml-auto sm:absolute sm:right-16 border border-black">Edit</button>
               <section id="user-name" className="w-full px-4 py-1 sm:py-2 border border-slate-400 rounded-lg">
                  <h1 className="font-bold">Full Name</h1>
                  <p className="text-slate-700 truncate">{currentUser?.displayName || 'unknown'}</p>
               </section>
               <section id="email" className="w-full px-4 py-1 sm:py-2 border border-slate-400 rounded-lg">
                  <h1 className="font-bold">Email</h1>
                  <p className="text-slate-700 truncate">{currentUser?.email || 'unknown'}</p>
               </section>
               <section id="password" className="w-full px-4 py-1 sm:py-2 border border-slate-400 rounded-lg">
                  <h1 className="font-bold">Password</h1>
                  <p className="text-slate-700 truncate">{'*'.repeat((currentUser?.providerData[0].providerId)?.length || 8)}</p>
               </section>
            </article>
         )}
      </main>
   )
}

export default Account
