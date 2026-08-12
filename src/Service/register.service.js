const serverURL = import.meta.env.VITE_API_SERVER_URL
const URL = `${serverURL}/api/v1/users`

export const registerService = async (user) => {
    try {
        const response = await fetch(`${URL}/register` , {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: user.userName,
                nickname: user.nickname,
                email_register: user.email,
                password: user.pass
            })
        })

        if(!response.ok){
            const errorBody = await response.json().catch(() => ({}))
            const err = new Error(errorBody.error || errorBody.message || 'Registration failed')
            if (errorBody.field) {
                err.field = errorBody.field
            }
            throw err
        }
        return response
    } catch (error) {
        console.error(`Error in Register: ${error}`)
        throw error
    }
    
}
