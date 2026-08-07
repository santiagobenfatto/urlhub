import { linksListAdapter } from '../Adapters/links.adapter.js'
import { publicHubAdapter } from '../Adapters/hub.adapter.js'

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
        const json = await response.json()
        return json.data?.[0] || null
    } catch (error) {
        console.error('Error in getUserHub:', error)
        throw error
    }
}

const getHubLinks = async (hubId) => {
    try {
        const response = await fetch(`${URL}/${hubId}/links`, {
            method: 'GET',
            credentials: 'include'
        })
        if (!response.ok) {
            throw new Error(`Error fetching hub links. Status: ${response.status}`)
        }
        const json = await response.json()
        return json.data || []
    } catch (error) {
        console.error('Error in getHubLinks:', error)
        throw error
    }
}

const getPublicHub = async (hubId) => {
    try {
        const response = await fetch(`${URL}/public/${hubId}`)
        if (!response.ok) {
            throw new Error(`Error fetching public hub. Status: ${response.status}`)
        }
        const rawData = await response.json()
        const hub = await publicHubAdapter(rawData.data)
        if (hub?.links) {
            hub.links = await linksListAdapter(hub.links)
        }
        return hub
    } catch (error) {
        console.error('Error in getPublicHub:', error)
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

const addLinkToHubService = async (hubId, linkId) => {
    try {
        const response = await fetch(`${URL}/${hubId}/links`, {
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

const removeLinkFromHubService = async (hubId, linkId) => {
    try {
        const response = await fetch(`${URL}/${hubId}/links/${linkId}`, {
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
    getHubLinks,
    getPublicHub,
    saveHub,
    addLinkToHubService,
    removeLinkFromHubService
}
