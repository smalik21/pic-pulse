import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import UserPage from "./pages/UserPage"
import PrivateWrapper from "./components/PrivateWrapper"
import { ToastContainer } from "react-toastify"
import PasswordReset from "./pages/PasswordReset"

export default function App() {

   return (
      <div className="min-h-dvh max-w-screen-2xl font-body dark:text-white bg-light dark:bg-dark">
         <Router>
            <Routes>
               <Route element={<PrivateWrapper />}>
                  <Route path="/user/*" element={<UserPage />} />
               </Route>
               <Route path="/" element={<HomePage />} />
               <Route path="/search/:q" element={<SearchPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/password-reset" element={<PasswordReset />} />
               <Route path="*" element={<Navigate to={'/'} />} />
            </Routes>
         </Router>
         <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
         />
      </div>
   )
}
