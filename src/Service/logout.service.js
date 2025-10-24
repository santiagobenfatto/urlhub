const URL = import.meta.env.VITE_API_LOGOUT_URL

export const logout = async () => {
    try {
        console.log('LOGOUT FUNCTION')
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
