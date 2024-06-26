import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useAlert } from "../hooks/useAlert"
import AuthHeader from "../components/headers/DefaultHeader"
import GoogleIcon from "../assets/google-icon.svg"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

const SignupPage = () => {

   const [name, setName] = useState<string>('')
   const [loading, setLoading] = useState<boolean>(false)
   const [googleLoading, setGoogleLoading] = useState<boolean>(false)

   const nameRef = useRef<HTMLInputElement>(null)
   const emailRef = useRef<HTMLInputElement>(null)
   const passRef = useRef<HTMLInputElement>(null)
   const confirmPassRef = useRef<HTMLInputElement>(null)

   const navigate = useNavigate()
   const { signup, signInWithGoogle, isAuthenticated, update_Profile } = useAuth()
   const { onSuccess, onError } = useAlert()

   useEffect(() => {
      if (isAuthenticated) {
         if (name) update_Profile({ displayName: name })
         onSuccess('Logged in successfully!')
         navigate('/')
      }
   }, [isAuthenticated])

   const resetFormFields = () => {
      nameRef.current!.value = ''
      emailRef.current!.value = ''
      passRef.current!.value = ''
      confirmPassRef.current!.value = ''
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
      const name = nameRef.current?.value.trim()
      const email = emailRef.current?.value.trim()
      const password = passRef.current?.value.trim()
      const confirmPassword = confirmPassRef.current?.value.trim()

      if (!name || !email || !password) return

      // Password validation
      if (password && password.length < 8) {
         onError('Password should be at least 8 characters long.')
         passRef.current?.focus()
         return
      }
      if (password && confirmPassword !== password) {
         onError('Passwords do not match.')
         passRef.current?.focus()
         return
      }

      setLoading(true)

      signup(email, password)
         .then(() => {
            setName(name)
         })
         .catch((error) => {
            if (error.toString() === "FirebaseError: Firebase: Error (auth/email-already-in-use).")
               onError('Username already taken.')
            else onError('Failed to signup.')
         })
         .finally(() => {
            resetFormFields()
            setLoading(false)
         })
   }

   return (
      <>
         <AuthHeader />
         <main className="w-full h-dvh flex justify-center items-center bg-heroSection">
            <form
               onSubmit={handleSubmit}
               className="p-8 w-full max-w-sm mx-auto flex flex-col gap-6 text-dark bg-white dark:bg-dark rounded-lg"
            >
               <h1 className="font-bold text-center dark:text-white text-2xl">Sign Up</h1>
               <section id="username-password-signup" className="gap-3 flex flex-col">
                  <div className="relative z-0 w-full group">
                     <input
                        type="text"
                        name="floating_name"
                        id="floating_name"
                        className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:blue-400 peer"
                        placeholder=""
                        ref={nameRef}
                        disabled={loading || googleLoading}
                        required
                     />
                     <label htmlFor="floating_name" className="ml-3 px-1 hover:cursor-text bg-white dark:bg-dark peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Name
                     </label>
                  </div>
                  <div className="relative z-0 w-full group">
                     <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:blue-400 peer"
                        placeholder=""
                        ref={emailRef}
                        disabled={loading || googleLoading}
                        required
                     />
                     <label htmlFor="floating_email" className="ml-3 px-1 hover:cursor-text bg-white dark:bg-dark peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Email address
                     </label>
                  </div>
                  <div className="relative z-0 w-full group">
                     <input
                        type="password"
                        name="floating_password"
                        id="floating_password"
                        className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:blue-400 peer"
                        placeholder=""
                        ref={passRef}
                        disabled={loading || googleLoading}
                        required
                     />
                     <label htmlFor="floating_password" className="ml-3 px-1 hover:cursor-text bg-white dark:bg-dark peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Password
                     </label>
                  </div>
                  <div className="relative z-0 w-full group">
                     <input
                        type="password"
                        name="repeat_password"
                        id="floating_repeat_password"
                        className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:blue-400 peer"
                        placeholder=""
                        ref={confirmPassRef}
                        disabled={loading || googleLoading}
                        required
                     />
                     <label htmlFor="floating_repeat_password" className="ml-3 px-1 hover:cursor-text bg-white dark:bg-dark peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Confirm password
                     </label>
                  </div>
                  <button
                     type="submit"
                     className="w-full mt-4 py-2.5 text-white bg-green-700 hover:bg-green-600 active:bg-green-800 rounded-md disabled:hover:bg-green-700"
                     disabled={loading || googleLoading}
                  >
                     {!loading
                        ? <>Signup</>
                        : <Spinner />
                     }
                  </button>
                  <p className="text-sm text-center text-gray-500">Already have an account?
                     <Link
                        to={'/login'}
                        className="px-1 font-semibold hover:underline text-green-600 hover:text-green-500 active:text-green-700"
                     >
                        Login
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

export default SignupPage
