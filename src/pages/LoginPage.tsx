import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useAlert } from "../hooks/useAlert"
import AuthHeader from "../components/headers/AuthHeader"

const LoginPage = () => {

   const [error, setError] = useState<string>('')
   const [loading, setLoading] = useState<boolean>(false)

   const usernameRef = useRef<HTMLInputElement>(null)
   const passwordRef = useRef<HTMLInputElement>(null)

   const { currentUser, isAuthenticated, login } = useAuth()
   const { onSuccess, onError } = useAlert()
   const navigate = useNavigate()

   useEffect(() => {
      if (isAuthenticated) navigate('/')
   }, [isAuthenticated])

   const resetFormFields = () => {
      usernameRef.current!.value = ''
      passwordRef.current!.value = ''
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const username = usernameRef.current?.value.trim()
      const password = passwordRef.current?.value.trim()

      console.log("username:", username)
      console.log("password:", password)

      if (!username || !password) return

      setLoading(true)

      login(username, password)
         .then(() => onSuccess('Logged in successfully!'))
         .catch(() => onError('Invalid Credentials.'))
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
               <h1 className="mb-6 font-bold text-center text-2xl">Log In</h1>
               <div className="relative z-0 w-full group">
                  <input
                     type="email"
                     name="floating_username"
                     id="floating_username"
                     className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=""
                     ref={usernameRef}
                     disabled={loading}
                     required
                  />
                  <label htmlFor="floating_username" className="ml-3 px-1 hover:cursor-text bg-white peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                     Username
                  </label>
               </div>
               <div className="relative z-0 w-full group">
                  <input
                     type="password"
                     name="floating_password"
                     id="floating_password"
                     className="block rounded-md py-3 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=""
                     ref={passwordRef}
                     disabled={loading}
                     required
                  />
                  <label htmlFor="floating_password" className="ml-3 px-1 hover:cursor-text bg-white peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-2 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                     Password
                  </label>
               </div>
               <button
                  type="submit"
                  className="w-full mt-2 py-2.5 text-white bg-green-700 hover:bg-green-600 active:bg-green-800 rounded-md disabled:hover:bg-green-700"
                  disabled={loading}
               >
                  {!loading
                     ? <>Login</>
                     : <>Logging in...</>
                  }
               </button>
               <p className="text-sm text-center text-gray-500">Don't have an account?
                  <Link to={'/signup'} className="px-1 font-semibold hover:underline text-green-600 hover:text-green-500 active:text-green-700">
                     Signup
                  </Link>
               </p>

            </form>
         </main>
      </>
   )
}

export default LoginPage
