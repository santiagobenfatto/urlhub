import { loginService } from '../Service/login.service.js'

export const loginAdapter = async (credentials) => {
    const rawData = await loginService(credentials)
    return {
        id: rawData?._id || '',
        userName: rawData?.name || '',
        email: rawData?.email || '',
        linkList: rawData?.link_list || [],
        hubSetup: rawData?.hub_setup || null,
        response: rawData?.response || {}
    }
}