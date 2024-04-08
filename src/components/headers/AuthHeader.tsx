import PageTitle from "../PageTitle"

const AuthHeader = () => {
   return (
      <header id="authHeader" className="absolute w-full py-3 p-2 sm:p-4 text-white bg-cover">
         <section className="w-full flex justify-between">
            <PageTitle />
         </section>
      </header>
   )
}

export default AuthHeader
