import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"

export default function App() {

   return (
      <div className="min-h-dvh max-w-screen-2xl font-body bg-light">
         <Router>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/search" element={<SearchPage />} />
            </Routes>
         </Router>
      </div>
   )
}
