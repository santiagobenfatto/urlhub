export const publicHubAdapter = async (hubData) => {
    if (!hubData) return null
    return {
        id: hubData.id,
        name: hubData.name,
        firstName: hubData.first_name,
        nickname: hubData.nickname,
        links: hubData.links
    }
}
