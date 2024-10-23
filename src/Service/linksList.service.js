import config from '../../config.js'

const URL = config.linksURL

const getLinkListById = async (linkListId) => {
    try {
        const response = await fetch(`${URL}/api/${linkListId}`)
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

const addLink = async (link) => {
    try {
        const response = await fetch(`${URL}/api/link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(link)
        })

        if(!response.ok){
            throw new Error(`Error fetching ${URL}/api/link`)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('Error in addLink', error)
        throw error
    }
}

export {
    getLinkListById,
    addLink
}