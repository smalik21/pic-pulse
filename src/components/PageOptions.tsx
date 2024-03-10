const PageOptions = () => {
   return (
      <section className="space-x-8 flex items-center" id="page-options">
         <input
            type="checkbox"
            name="theme-toggle"
            id="theme-toggle"
            className="hidden sm:inline appearance-none h-fit w-9 bg-light rounded-md p-1
                     before:block before:size-3.5 before:bg-dark before:rounded before:border-none
                     before:transition-all before:duration-200 before:ease-linear
                     checked:before:translate-x-full checked:bg-dark checked:before:bg-light
                     transition-colors duration-200"
         />
         <button className="hidden sm:inline">Upload</button>
         <button className="px-4 py-1 sm:py-2 text-sm rounded-md text-black bg-white hover:bg-slate-200">
            Login
         </button>
      </section>
   )
}

export default PageOptions
