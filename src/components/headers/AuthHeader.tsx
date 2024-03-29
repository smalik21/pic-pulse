import PageTitle from "../PageTitle"
import { Link } from "react-router-dom"

const AuthHeader = ({ page }: { page: string }) => {
   return (
      <header id="authHeader" className="py-3 p-2 sm:p-4 text-white bg-heroSection bg-cover">
         <section className="w-full flex justify-between">
            <PageTitle />
            <Link
               to={page === "signup" ? "/login" : "/signup"}
               className="px-4 py-1 sm:py-2 text-sm flex items-center rounded-md text-black bg-white hover:bg-slate-200"
            >
               {page === "signup" ? "Login" : "Signup"}
            </Link>
         </section>
      </header>
   )
}

export default AuthHeader
