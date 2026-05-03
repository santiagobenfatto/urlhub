const URL = import.meta.env.VITE_API_SERVER_URL

export const logout = async () => {
    try {
        const response = await fetch(`${URL}/users/logout`, {
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
