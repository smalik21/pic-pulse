import EditIcon from "../../assets/edit-icon.svg"
import { useAuth } from "../../hooks/useAuth"
import { useFile } from "../../hooks/useFile"
import { toast } from "react-toastify"

type PropTypes = {
   setUserProfile: React.Dispatch<React.SetStateAction<string>>
   setUploading: React.Dispatch<React.SetStateAction<boolean>>
   uploading: boolean
}

const ProfilePictureUpload = ({ setUserProfile, setUploading, uploading }: PropTypes) => {

   const { storeProfile } = useFile()
   const { update_Profile } = useAuth()

   const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const profilePicture: File = e.target.files![0]
      if (!profilePicture) return

      const pictureUploadPromise = new Promise<void>(async (resolve, reject) => {
         try {
            setUploading(true)
            const profilePicURL: string = await storeProfile(profilePicture)
            setUserProfile(profilePicURL)
            await update_Profile({ photoURL: profilePicURL })
            setUploading(false)
            resolve()
         }
         catch { reject() }
      })

      toast.promise(
         pictureUploadPromise,
         {
            pending: 'Picture uploading...',
            success: 'Profile picture updated!',
            error: 'Error updating profile picture'
         }
      )
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
