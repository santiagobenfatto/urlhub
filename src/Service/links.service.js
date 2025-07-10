import config from '../../config.js'

const URL = config.linksURL

const getLinkListById = async (linkListId) => {
    try {
        const response = await fetch(`${URL}/api/v1/${linkListId}`)
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
        const response = await fetch(`${URL}/api/v1/addNewLink`, {
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
        const response = await fetch(`${URL}/api/v1/addPublicLink`, {
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

export {
    getLinkListById,
    addNewLink,
    addPublicLink
}