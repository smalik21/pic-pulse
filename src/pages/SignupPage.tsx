import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useAlert } from "../hooks/useAlert"
import AuthHeader from "../components/headers/AuthHeader"

const SignupPage = () => {

   const [name, setName] = useState<string>('')
   const [loading, setLoading] = useState<boolean>(false)

   const nameRef = useRef<HTMLInputElement>(null)
   const emailRef = useRef<HTMLInputElement>(null)
   const passRef = useRef<HTMLInputElement>(null)
   const confirmPassRef = useRef<HTMLInputElement>(null)

   const navigate = useNavigate()
   const { signup, isAuthenticated, update_Profile } = useAuth()
   const { onSuccess, onError } = useAlert()

   useEffect(() => {
      if (isAuthenticated) {
         if (name) update_Profile({ displayName: name })
         navigate('/')
      }
   }, [isAuthenticated])

   const resetFormFields = () => {
      nameRef.current!.value = ''
      emailRef.current!.value = ''
      passRef.current!.value = ''
      confirmPassRef.current!.value = ''
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

      console.log("name:", name)
      console.log("username:", email)
      console.log("password:", password)

      setLoading(true)

      signup(email, password)
         .then(() => {
            setName(name)
            onSuccess('Signed up successfully!')
         })
         .catch((error) => {
            console.log("error:", error)
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
         <main className="w-full h-dvh flex justify-center items-center bg-blue-400 bg-heroSection">
            <form
               onSubmit={handleSubmit}
               className="p-8 w-full max-w-sm mx-auto flex flex-col gap-5 text-dark bg-white rounded-lg"
            >
               <h1 className="mb-6 font-bold text-center text-2xl">Sign Up</h1>
               <div className="relative z-0 w-full group">
                  <input
                     type="text"
                     name="floating_name"
                     id="floating_name"
                     className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=""
                     ref={nameRef}
                     disabled={loading}
                     required
                  />
                  <label htmlFor="floating_name" className="ml-3 px-1 hover:cursor-text bg-white peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                     Name
                  </label>
               </div>
               <div className="relative z-0 w-full group">
                  <input
                     type="email"
                     name="floating_email"
                     id="floating_email"
                     className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=""
                     ref={emailRef}
                     disabled={loading}
                     required
                  />
                  <label htmlFor="floating_email" className="ml-3 px-1 hover:cursor-text bg-white peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                     Email address
                  </label>
               </div>
               <div className="relative z-0 w-full group">
                  <input
                     type="password"
                     name="floating_password"
                     id="floating_password"
                     className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=""
                     ref={passRef}
                     disabled={loading}
                     required
                  />
                  <label htmlFor="floating_password" className="ml-3 px-1 hover:cursor-text bg-white peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                     Password
                  </label>
               </div>
               <div className="relative z-0 w-full group">
                  <input
                     type="password"
                     name="repeat_password"
                     id="floating_repeat_password"
                     className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=""
                     ref={confirmPassRef}
                     disabled={loading}
                     required
                  />
                  <label htmlFor="floating_repeat_password" className="ml-3 px-1 hover:cursor-text bg-white peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                     Confirm password
                  </label>
               </div>

               <button
                  type="submit"
                  className="w-full mt-2 py-2.5 text-white bg-green-700 hover:bg-green-600 active:bg-green-800 rounded-md disabled:hover:bg-green-700"
                  disabled={loading}
               >
                  {!loading
                     ? <>Signup</>
                     : <>Signing up...</>
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
            </form>
         </main>
      </>
   )
}

export default SignupPage
