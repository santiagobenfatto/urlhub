const serverURL = import.meta.env.VITE_API_SERVER_URL
const URL = `${serverURL}/api/v1/hubs`

const getUserHub = async () => {
    try {
        const response = await fetch(URL, {
            method: 'GET',
            credentials: 'include'
        })
        if (!response.ok) {
            throw new Error(`Error fetching hub. Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error in getUserHub:', error)
        throw error
    }
}

const saveHub = async (hubData) => {
    try {
        const response = await fetch(URL, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hubData)
        })
        if (!response.ok) {
            throw new Error(`Error saving hub. Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error in saveHub:', error)
        throw error
    }
}

const addLinkToHubService = async (linkId) => {
    try {
        const response = await fetch(`${URL}/links`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ link_id: linkId })
        })
        if (!response.ok) {
            throw new Error(`Error adding link to hub. Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error in addLinkToHubService:', error)
        throw error
    }
}

const removeLinkFromHubService = async (linkId) => {
    try {
        const response = await fetch(`${URL}/links/${linkId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
            throw new Error(`Error removing link from hub. Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error in removeLinkFromHubService:', error)
        throw error
    }
}

export {
    getUserHub,
    saveHub,
    addLinkToHubService,
    removeLinkFromHubService
}
