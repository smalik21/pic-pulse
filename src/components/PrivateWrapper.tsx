import { useAuth } from '../hooks/useAuth'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateWrapper = () => {
   const { isAuthenticated } = useAuth()
   return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default PrivateWrapper