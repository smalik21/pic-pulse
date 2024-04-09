import { useNavigate } from "react-router-dom"

type TagButtonPropTypes = {
   tag: string,
   handleClose?: () => void,
}
const TagButton = ({ tag, handleClose }: TagButtonPropTypes) => {

   const navigate = useNavigate()

   const handleQueryChange = (query: string) => {
      if (handleClose) handleClose()
      navigate('/search/' + query)
   }

   return (
      <button
         onClick={() => handleQueryChange(tag)}
         className="px-3 py-1.5 xs:px-4 xs:py-2 text-nowrap text-xs sm:text-base border border-black rounded-md hover:shadow-md shadow-black active:shadow-none"
      >
         {tag}
      </button>
   )
}

export default TagButton
