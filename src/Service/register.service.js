const URL = import.meta.env.VITE_API_REGISTER_URL

export const registerService = async (user) => {
    console.log('======= Inside register service ========')
    try {
        const response = await fetch(`${URL}` , {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: user.userName,
                email_register: user.email,
                password: user.pass
            })
        })
        console.log('This is the client response returned:', response)
        if(!response.ok){
            throw new Error(`Error fetching/post the ${URL}. Error status: ${response.status}`)
        }
        return response
    } catch (error) {
        console.log(`Error in Register: ${error}`)
        throw error
    }
    
}
