const serverURL = import.meta.env.VITE_API_SERVER_URL
const URL = `${serverURL}/api/v1/users/login`

export const loginService = async (credentials) => {
    try {
        const response = await fetch (URL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_register: credentials.email,
                password: credentials.pass
            })
        })
        if(!response.ok){
            throw new Error(`Error fetching/post the ${URL}. Error status: ${response.status}`)
        }
        return response
    } catch (error) {
        console.log(`Error in Login: ${error}`)
        throw error
    }
}
