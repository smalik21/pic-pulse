import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import AuthHeader from "../components/headers/AuthHeader"

const SignupPage = () => {

   const [error, setError] = useState<string>('')
   // const nameRef = useRef<HTMLInputElement>(null)
   const emailRef = useRef<HTMLInputElement>(null)
   const passRef = useRef<HTMLInputElement>(null)
   const confirmPassRef = useRef<HTMLInputElement>(null)

   const navigate = useNavigate()
   const { signup, isAuthenticated } = useAuth()

   useEffect(() => {
      if (isAuthenticated) navigate('/')
   }, [isAuthenticated])

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // const name = nameRef.current?.value.trim()
      const email = emailRef.current?.value.trim()
      const password = passRef.current?.value
      const confirmPassword = confirmPassRef.current?.value

      if (!email || !password) return

      // Password validation
      if (password && password.length < 8) {
         alert('New password should be at least 8 characters long.')
         passRef.current?.focus()
         return
      }
      if (password && confirmPassword !== password) {
         alert('Passwords do not match.')
         passRef.current?.focus()
         return
      }

      console.log("username:", email)
      console.log("password:", password)

      signup(email, password)
         .then(() => navigate('/login'))
         .catch((error) => setError(error))
   }

   return (
      <>
         <AuthHeader page="signup" />
         <main className="w-full h-dvh flex justify-center items-center bg-blue-400">
            <form
               onSubmit={handleSubmit}
               className="w-full max-w-sm flex flex-col sm:gap-2 border-black"
            >
               <h1 className="w-full text-center border">Sign Up</h1>
               {error && <p>{error.toString()}</p>}
               {/* <div className="mb-4">
                  <label htmlFor="fullName" className="block font-bold mb-2">
                     Full Name
                  </label>
                  <input
                     type="text"
                     id="fullName"
                     className="w-full px-4 py-2 border border-slate-400 rounded-lg"
                     placeholder="Enter your name"
                     ref={nameRef}
                     required
                  />
               </div> */}
               <div className="mb-4">
                  <label htmlFor="email" className="block font-bold mb-2">
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     className="w-full px-4 py-2 border border-slate-400 rounded-lg"
                     placeholder="Enter your email"
                     ref={emailRef}
                     required
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
                     placeholder="Enter your password"
                     ref={passRef}
                     required
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
                     placeholder="Confirm your password"
                     ref={confirmPassRef}
                     required
                  />
               </div>

               <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-400 active:bg-green-800 border"
               >
                  Submit
               </button>

            </form>
         </main>
      </>
   )
}

export default SignupPage
