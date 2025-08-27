export const loginAdapter = async (userData) => {
    return {
        userName: userData?.first_name || '',
        nickname: userData?.nickname || '',
        email: userData?.email || '',
        hubSetup: userData?.hub_setup || null
    }
}