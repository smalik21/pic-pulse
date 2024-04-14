import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useAlert } from "../hooks/useAlert"
import DefaultHeader from "../components/headers/DefaultHeader"
import GoogleIcon from "../assets/google-icon.svg"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

const LoginPage = () => {

   const [loading, setLoading] = useState<boolean>(false)
   const [googleLoading, setGoogleLoading] = useState<boolean>(false)

   const usernameRef = useRef<HTMLInputElement>(null)
   const passwordRef = useRef<HTMLInputElement>(null)

   const { isAuthenticated, login, signInWithGoogle } = useAuth()
   const { onSuccess, onError } = useAlert()
   const navigate = useNavigate()

   useEffect(() => {
      if (isAuthenticated) {
         onSuccess('Logged in successfully!')
         navigate('/')
      }
   }, [isAuthenticated])

   const resetFormFields = () => {
      usernameRef.current!.value = ''
      passwordRef.current!.value = ''
   }

   const handleGoogleSignIn = () => {
      setGoogleLoading(true)

      const googleSignupPromise = new Promise<void>((resolve, reject) => {
         signInWithGoogle()
            .then(() => resolve())
            .catch(() => reject())
            .finally(() => {
               resetFormFields()
               setGoogleLoading(false)
            })
      })

      toast.promise(
         googleSignupPromise,
         {
            pending: 'Signing in with Google...',
            error: 'Error signing in.'
         }
      )
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const username = usernameRef.current?.value.trim()
      const password = passwordRef.current?.value.trim()

      if (!username || !password) return

      setLoading(true)

      login(username, password)
         .then(() => { })
         .catch(() => onError('Invalid Credentials.'))
         .finally(() => {
            resetFormFields()
            setLoading(false)
         })
   }

   return (
      <>
         <DefaultHeader />
         <main className="w-full h-dvh flex justify-center items-center bg-heroSection">
            <form
               onSubmit={handleSubmit}
               className="p-8 w-full max-w-sm mx-auto flex flex-col gap-6 text-dark bg-white dark:bg-dark rounded-lg"
            >
               <h1 className="font-bold text-center dark:text-white text-2xl">Log In</h1>
               <section id="username-password-signup" className="gap-3 flex flex-col items-center">
                  <div className="relative z-0 w-full group">
                     <input
                        type="email"
                        name="floating_username"
                        id="floating_username"
                        className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400 peer"
                        placeholder=""
                        ref={usernameRef}
                        disabled={loading || googleLoading}
                        required
                     />
                     <label htmlFor="floating_username" className="ml-3 px-1 hover:cursor-text bg-white dark:bg-dark peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Username
                     </label>
                  </div>
                  <div className="relative z-0 w-full group">
                     <input
                        type="password"
                        name="floating_password"
                        id="floating_password"
                        className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400 peer"
                        placeholder=""
                        ref={passwordRef}
                        disabled={loading || googleLoading}
                        required
                     />
                     <label htmlFor="floating_password" className="ml-3 px-1 hover:cursor-text bg-white dark:bg-dark peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Password
                     </label>
                  </div>
                  <Link to={'/password-reset'} className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:font-semibold text-center">
                     Forgot Password?
                  </Link>
                  <button
                     type="submit"
                     className="w-full mt-4 py-2.5 text-white bg-green-700 hover:bg-green-600 active:bg-green-800 rounded-md disabled:hover:bg-green-700"
                     disabled={loading || googleLoading}
                  >
                     {!loading
                        ? <>Login</>
                        : <Spinner />
                     }
                  </button>
                  <p className="text-sm text-center text-gray-500">Don't have an account?
                     <Link to={'/signup'} className="px-1 font-semibold hover:underline text-green-600 hover:text-green-500 active:text-green-700">
                        Signup
                     </Link>
                  </p>
               </section>
               <div
                  id="section-seperator"
                  className="mx-auto my-3 w-11/12 h-px bg-gray-300 dark:bg-gray-400 flex justify-center
                  before:content-['OR'] before:text-xs before:text-gray-400 before:flex before:size-fit before:px-2
                  before:-mt-2  before:bg-white dark:before:bg-dark"
               >
               </div>
               <section id="external-provider-signup" className="mb-2">
                  <button
                     type="button"
                     onClick={handleGoogleSignIn}
                     className="w-full flex items-center p-2 sm:p-2.5 rounded-lg border text-sm text-gray-500 border-gray-500 hover:text-gray-800 hover:border-gray-800 dark:hover:text-gray-300 dark:hover:border-gray-300 active:cursor-default"
                     disabled={googleLoading}
                  >
                     <img src={GoogleIcon} alt="google-icon" className="absolute size-6" />
                     <span className="mx-auto">Login With Google</span>
                  </button>
               </section>
            </form>
         </main>
      </>
   )
}

export default LoginPage
