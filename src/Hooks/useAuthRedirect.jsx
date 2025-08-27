import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const URL = import.meta.env.VITE_API_LOGIN_URL

export const useAuthRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${URL}/auth/verify`, {
          method: 'POST',
          credentials: 'include'
        })
        if (response.ok) {
          navigate('/dashboard')
        }
      } catch(error) {
        console.log(error)
      }
    }

    verifyToken()
  }, [])
}
