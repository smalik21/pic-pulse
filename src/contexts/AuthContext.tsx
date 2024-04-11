import { ReactNode, createContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '../firebase-config'
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signInWithPopup,
   updateProfile,
   updateEmail,
   updatePassword,
   sendPasswordResetEmail,
   onAuthStateChanged,
   deleteUser,
   signOut,
   User,
   UserCredential,
} from "firebase/auth"

type profileType = {
   displayName?: string | null | undefined;
   photoURL?: string | null | undefined;
}

type AuthContextType = {
   currentUser: User | null
   isAuthenticated: boolean
   signup: (email: string, password: string) => Promise<UserCredential>
   login: (email: string, password: string) => Promise<UserCredential>
   signInWithGoogle: () => Promise<UserCredential>
   update_Profile: (profileInfo: profileType) => Promise<void>
   update_Email: (newEmail: string) => Promise<void>
   update_Password: (newPassword: string) => Promise<void>
   delete_User: () => Promise<void>
   resetPassword: (email: string) => Promise<void>
   logout: () => Promise<void>
}

const AuthContextInitState: AuthContextType = {
   currentUser: null,
   isAuthenticated: false,
   signup: (_email: string, _password: string) => Promise.reject(),
   login: (_email: string, _password: string) => Promise.reject(),
   signInWithGoogle: () => Promise.reject(),
   update_Profile: (_profileInfo: profileType) => Promise.reject(),
   update_Email: (_newEmail: string) => Promise.reject(),
   update_Password: (_newPassword: string) => Promise.reject(),
   delete_User: () => Promise.reject(),
   resetPassword: (_email: string) => Promise.reject(),
   logout: () => Promise.reject(),
}

export const AuthContext = createContext<AuthContextType>(AuthContextInitState)

type AuthProviderPropTypes = {
   children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderPropTypes) => {
   const [currentUser, setCurrentUser] = useState<User | null>(null)
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(true)

   const signup = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
   const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
   const resetPassword = (email: string) => sendPasswordResetEmail(auth, email)
   const signInWithGoogle = () => signInWithPopup(auth, googleProvider)
   const logout = () => signOut(auth)

   const update_Profile = (profileInfo: profileType) => {
      if (currentUser) return updateProfile(currentUser, profileInfo)
      return Promise.reject()
   }

   const update_Email = (newEmail: string) => {
      if (currentUser) return updateEmail(currentUser, newEmail)
      return Promise.reject()
   }

   const update_Password = (newPassword: string) => {
      if (currentUser) return updatePassword(currentUser, newPassword)
      return Promise.reject()
   }

   const delete_User = () => {
      if (currentUser) return deleteUser(currentUser)
      return Promise.reject()
   }

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setCurrentUser(user)
         setIsAuthenticated(!!user)
         setLoading(false)
      })

      return unsubscribe
   }, [])

   const value: AuthContextType = {
      currentUser,
      isAuthenticated,
      signup,
      login,
      signInWithGoogle,
      update_Profile,
      update_Email,
      update_Password,
      delete_User,
      resetPassword,
      logout,
   }

   return (
      <AuthContext.Provider value={value}>
         {!loading && children}
      </AuthContext.Provider>
   )
}