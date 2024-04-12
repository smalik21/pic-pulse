import { useRef, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate, Link } from "react-router-dom"
import DefaultHeader from "../components/headers/DefaultHeader"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

const PasswordReset = () => {

   const [loading, setLoading] = useState<boolean>(false)
   const emailRef = useRef<HTMLInputElement>(null)

   const navigate = useNavigate()

   const { resetPassword } = useAuth()

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const email = emailRef.current?.value.trim()
      if (!email) return

      setLoading(true)

      const passwordResetPromise = new Promise<void>((resolve, reject) => {
         resetPassword(email)
            .then(() => {
               resolve()
               navigate('/login')
            })
            .catch(() => reject())
            .finally(() => {
               emailRef.current!.value = ''
               setLoading(false)
            })
      })

      toast.promise(
         passwordResetPromise,
         {
            pending: 'Sending password reset email...',
            success: 'Password reset email sent.',
            error: 'Error sending email.'
         }
      )
   }

   return (
      <>
         <DefaultHeader />
         <main className="w-full h-dvh flex justify-center items-center bg-blue-400 bg-heroSection">
            <form
               onSubmit={handleSubmit}
               className="p-8 w-full max-w-sm mx-auto flex flex-col items-center gap-5 text-dark bg-white rounded-lg"
            >
               <h1 className="mb-4 font-bold text-center text-2xl">Reset Password</h1>
               <div className="relative z-0 w-full group">
                  <input
                     type="email"
                     name="email"
                     id="email"
                     className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=""
                     ref={emailRef}
                     disabled={loading}
                     required
                  />
                  <label htmlFor="email" className="ml-3 px-1 hover:cursor-text bg-white peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                     Email
                  </label>
               </div>
               <button
                  type="submit"
                  className="w-full mt-3 mb-6 py-3 sm:py-2.5 font-light text-sm sm:text-base text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-md"
                  disabled={loading}
               >
                  {!loading ? <>Send Password Reset Email</> : <Spinner />}
               </button>
               <Link to={'/login'} className="py-1 px-2 sm:px-4 text-sm text-green-700 border border-green-700 hover:bg-green-700 hover:text-white rounded-md">Back to Login</Link>
            </form>
         </main>
      </>
   )
}

export default PasswordReset
