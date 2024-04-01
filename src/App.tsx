import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import UserPage from "./pages/UserPage"

export default function App() {

   return (
      <div className="min-h-dvh max-w-screen-2xl font-body bg-light">
         <Router>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/search/:q" element={<SearchPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/user/*" element={<UserPage />} />
               <Route path="*" element={<Navigate to={'/'} />} />
            </Routes>
         </Router>
      </div>
   )
}
