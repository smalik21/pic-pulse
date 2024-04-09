import EditIcon from "../assets/edit-icon.svg"
import { useAuth } from "../hooks/useAuth"
import { useFile } from "../hooks/useFile"
import { useAlert } from "../hooks/useAlert"

type PropTypes = {
   setUserProfile: React.Dispatch<React.SetStateAction<string>>
   setUploading: React.Dispatch<React.SetStateAction<boolean>>
   uploading: boolean
}

const ProfilePictureUpload = ({ setUserProfile, setUploading, uploading }: PropTypes) => {

   const { storeProfile } = useFile()
   const { update_Profile } = useAuth()
   const { onSuccess, onError, onInfo } = useAlert()

   const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const profilePicture: File = e.target.files![0]
      if (!profilePicture) return

      onInfo('Picture uploading, please wait...')

      try {
         setUploading(true)
         console.log("uploading...")
         const profilePicURL: string = await storeProfile(profilePicture)
         setUserProfile(profilePicURL)
         await update_Profile({ photoURL: profilePicURL })
         setUploading(false)
         console.log("uploaded.")
         onSuccess('Profile picture updated!')
      }
      catch {
         onError('Error updating profile picture.')
      }
   }

   return (
      <div className="absolute size-7 -mt-1 -mr-36 sm:-mr-60">
         <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
            id="profile-picture-input"
            disabled={uploading}
         />
         <label
            htmlFor="profile-picture-input"
            className="invert opacity-70 hover:opacity-100 active:opacity-70"
         >
            <img src={EditIcon} alt="edit-icon" />
         </label>
      </div>
   )
}

export default ProfilePictureUpload
