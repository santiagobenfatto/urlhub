import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('/auth/verify', {
          method: 'POST',
          credentials: 'include'
        })
        if (res.ok) {
          navigate('/dashboard')
        }
      } catch(error) {
        console.log(error)
      }
    }

    verifyToken()
  }, [])
}
