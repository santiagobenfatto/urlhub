import config from '../../config.js'

const URL = config.apiLinksURL

const getLinkListById = async (linkListId) => {
    try {
        const response = await fetch(`${URL}/${linkListId}`)
        if(!response.ok) {
            throw new Error(`Error fetching ${URL}/api/${linkListId}. Status: ${response.status}`)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('Error in getLinkListById:', error)
        throw error
    }
}

const addNewLink = async (link) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(link)
        })

        if(!response.ok){
            throw new Error(`Error fetching ${URL}/api/v1/:link`)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('Error in addLink', error)
        throw error
    }
}


const addPublicLink = async (link) => {
    try {
        const response = await fetch(`${URL}/short`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(link)
        })

        if(!response.ok){
            throw new Error(`Error fetching ${URL}/api/v1/addPublicLink`)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('Error creating simple link', error)
        throw error
    }
}

const updateLink = async (linkId, updates) => {
    try {
        const response = await fetch(`${URL}/${linkId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        })

        if(!response.ok){
            throw new Error(`Error deleting link. Status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating the link', error)
        throw error
    }
}

const deleteLink = async (linkId) => { 
    try {
        const response = await fetch(`${URL}/${linkId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })

        if(!response.ok){
            throw new Error(`Error deleting link. Status: ${response.status}`)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('Error creating simple link', error)
        throw error
    }
}

export {
    getLinkListById,
    addNewLink,
    addPublicLink,
    updateLink,
    deleteLink
}