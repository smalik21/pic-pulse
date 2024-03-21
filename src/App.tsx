import { BrowserRouter as Router, Routes, Route, Navigate, useParams, redirect } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"

export default function App() {

   return (
      <div className="min-h-dvh max-w-screen-2xl font-body bg-light">
         <Router>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/search/:q" element={<SearchPage />} />
               <Route path="*" element={<Navigate to={'/'} />} />
            </Routes>
         </Router>
      </div>
   )
}
