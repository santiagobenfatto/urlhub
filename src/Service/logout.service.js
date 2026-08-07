const serverURL = import.meta.env.VITE_API_SERVER_URL
const URL = `${serverURL}/api/v1/users`

export const logout = async () => {
    try {
        const response = await fetch(`${URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        })
        
        if (!response.ok) {
            throw new Error('Logout failed')
        }

        return response
    } catch (error) {
        console.error('Logout failed, error:', error)
        throw error
    }
}
