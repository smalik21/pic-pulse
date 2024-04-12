import logo from "../assets/logo.svg"
import { Link } from "react-router-dom"

const PageTitle = () => {
   return (
      <Link to={'/'}>
         <span className="flex gap-2 items-center" id="page-title">
            <img className="size-6 sm:size-8 md:size-10" src={logo} alt="page-logo" />
            <span className="font-title text-lg sm:text-xl md:text-2xl">PicPulse</span>
         </span>
      </Link>
   )
}

export default PageTitle
