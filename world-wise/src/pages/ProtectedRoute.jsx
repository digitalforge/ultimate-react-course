import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/FakeAuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!isAuthenticated) navigate('/')
  // }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
