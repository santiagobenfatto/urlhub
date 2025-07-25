import config from '../../config.js'

const URL = config.apiRegisterURL

export const registerService = async (user) => {
    console.log(URL)
    try {
        const response = await fetch(`https://urlhub-server-2beh.onrender.com/api/v1/register` , {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_register: user.email,
                password: user.pass
            })
        })
        if(!response.ok){
            throw new Error(`Error fetching/post the ${URL}. Error status: ${response.status}`)
        }
        return response
    } catch (error) {
        console.log(`Error in Register: ${error}`)
        throw error
    }
    
}
