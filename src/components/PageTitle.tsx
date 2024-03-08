import logo from "../assets/logo.svg"

const PageTitle = () => {
    return (
        <span className="flex gap-2 items-center" id="page-title">
            <img className="size-6 sm:size-8 md:size-10" src={logo} alt="page-logo" />
            <span className="font-title text-lg sm:text-xl md:text-2xl">PicPulse</span>
        </span>
    )
}

export default PageTitle
