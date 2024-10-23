import config from '../../config.js'

const URL = config.loginURL

export const login = async (user) => {
    try {
        const response = await fetch (URL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_register: user.email,
                password: user.password
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
