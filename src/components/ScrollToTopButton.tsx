import arrowIcon from "../assets/arrow-icon.svg"

const ScrollToTopButton = () => {

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      })
   }

   return (
      <button
         onClick={scrollToTop}
         className="fixed size-12 flex justify-center items-center mb-10 mr-10 bottom-0 right-0 rounded-lg bg-gray-200 hover:bg-white active:bg-gray-200 border border-black dark:bg-dark dark:hover:bg-dark dark:active:bg-black dark:border-gray-700 z-10"
      >
         <img
            src={arrowIcon}
            alt="arrow-icon"
            className="transform rotate-180 dark:invert"
         />
      </button>
   )
}

export default ScrollToTopButton
