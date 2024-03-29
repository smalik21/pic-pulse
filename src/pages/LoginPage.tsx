import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import AuthHeader from "../components/headers/AuthHeader"

const LoginPage = () => {

   const [error, setError] = useState<string>('')
   const usernameRef = useRef<HTMLInputElement>(null)
   const passwordRef = useRef<HTMLInputElement>(null)

   const { currentUser, isAuthenticated, login, logout } = useAuth()
   const navigate = useNavigate()

   useEffect(() => {
      if (isAuthenticated) navigate('/')
   }, [isAuthenticated])

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const username = usernameRef.current?.value
      const password = passwordRef.current?.value
      console.log("username:", username)
      console.log("password:", password)

      if (!username || !password) return

      login(username, password)
         .then(() => setError(''))
         .catch(error => setError(error))
   }

   const handleLogout = () => {
      logout()
   }

   return (
      <>
         <AuthHeader page="login" />
         <main className="w-full h-dvh flex justify-center items-center bg-blue-400">
            <article id="login-card" className="w-full xs:w-3/5 max-w-96 flex flex-col bg-white">
               <h1 className="w-full text-center border">Log In</h1>
               {error && <p>{error.toString()}</p>}
               {currentUser && <p>Logged in as: {currentUser.email}</p>}
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
               <button
                  onClick={handleLogout}
                  className="px-4 py-2 border"
               >
                  Log Out
               </button>
            </article>
         </main>
      </>
   )
}

export default LoginPage
