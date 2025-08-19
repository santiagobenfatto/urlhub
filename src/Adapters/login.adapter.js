export const loginAdapter = async (userData) => {
    return {
        id: userData?._id || '',
        userName: userData?.name || '',
        email: userData?.email || '',
        linkList: userData?.link_list || [],
        hubSetup: userData?.hub_setup || null,
        response: userData?.response || {}
    }
}