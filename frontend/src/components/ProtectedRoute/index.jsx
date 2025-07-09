import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = Cookies.get('jwt_token') !== undefined
    return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute


