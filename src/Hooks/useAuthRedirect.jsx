import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const serverUrl = import.meta.env.VITE_API_SERVER_URL
const URL = `${serverURL}/api/v1/users/auth/verify`

export const useAuthRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(URL, {
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
