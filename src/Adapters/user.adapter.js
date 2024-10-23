export const userAdapter = (userData) => {
    return {
        id: userData._id,
        userName: userData.name,
        email: userData.email,
        linkList: userData.link_list,
        hubSetup: userData.hub_setup
    }
}