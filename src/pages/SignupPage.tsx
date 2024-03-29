import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import AuthHeader from "../components/headers/AuthHeader"

const SignupPage = () => {

   const [error, setError] = useState<string>('')
   const usernameRef = useRef<HTMLInputElement>(null)
   const passwordRef = useRef<HTMLInputElement>(null)

   const navigate = useNavigate()
   const { signup, isAuthenticated } = useAuth()

   useEffect(() => {
      if (isAuthenticated) navigate('/')
   }, [isAuthenticated])

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const username = usernameRef.current?.value
      const password = passwordRef.current?.value
      if (!username || !password) return
      console.log("username:", username)
      console.log("password:", password)

      signup(username, password)
         .then(() => navigate('/login'))
         .catch((error) => setError(error))
   }

   return (
      <>
         <AuthHeader page="signup" />
         <main className="w-full h-dvh flex justify-center items-center bg-blue-400">
            <article id="signup-card" className="w-full xs:w-3/5 max-w-96 flex flex-col bg-white">
               <h1 className="w-full text-center border">Sign Up</h1>
               {error && <p>{error.toString()}</p>}
               <form
                  onSubmit={handleSubmit}
                  className="flex flex-col"
               >
                  <label htmlFor="username">Username:</label>
                  <input id="username" ref={usernameRef} type="text" required />
                  <label htmlFor="password">Password:</label>
                  <input id="password" ref={passwordRef} type="password" required />
                  <button
                     type="submit"
                     className="bg-green-600 hover:bg-green-400 active:bg-green-800 border"
                  >
                     Submit
                  </button>
               </form>
            </article>
         </main>
      </>
   )
}

export default SignupPage
