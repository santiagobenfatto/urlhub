const serverURL = import.meta.env.VITE_API_SERVER_URL
const URL = `${serverURL}/api/v1/users/logout`

export const logout = async () => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            credentials: 'include',
        })
        
        if (!response.ok) {
            throw new Error('Logout failed')
        }

        return response
    } catch (error) {
        console.log('Logout failed, error:', error)
        throw error
    }
}
