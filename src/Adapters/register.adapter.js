import { registerService } from '../Service/register.service.js'

export const registerAdapter = async (credentials) => {
    const rawData = await registerService(credentials)

    return {
        userName: rawData.user_name || '',
        response: rawData.response || {}
    }
}