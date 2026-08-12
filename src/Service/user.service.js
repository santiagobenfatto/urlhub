const serverURL = import.meta.env.VITE_API_SERVER_URL
const URL = `${serverURL}/api/v1/users`

export const updateUser = async (userData) => {
    try {
        const response = await fetch(`${URL}/update`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}))
            throw new Error(errorBody.error || errorBody.message || `Error updating user. Status: ${response.status}`)
        }
        const data = await response.json()
        return data.user || data.data || data
    } catch (error) {
        console.error('Error in updateUser:', error)
        throw error
    }
}
