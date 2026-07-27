const serverURL = import.meta.env.VITE_API_SERVER_URL
const URL = `${serverURL}/api/v1/links`

const getUserLinks = async () => {
    try {
        const response = await fetch(URL, {
            method: 'GET',
            credentials: 'include',
            })
        
        if(!response.ok) {
            throw new Error(`Error fetching ${URL} Status: ${response.status}`)
        }
        const data = await response.json()
        return data.data.data
        
    } catch (error) {
        console.error('Error in getUserLinks:', error)
        throw error
    }
}

const addNewLink = async (link) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(link)
        })

        if(!response.ok){
            const errorBody = await response.json().catch(() => ({}))
            throw new Error(errorBody.error || `Error al crear el link. Status: ${response.status}`)
        }

        const data = await response.json()
        return data.data?.data || data
        
    } catch (error) {
        console.error('Error in addLink', error)
        throw error
    }
}

const addPublicLink = async (link) => {
    try {
        const response = await fetch(`${URL}/short`, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                big_link: link.bigLink
            })
        })

        if(!response.ok){
            const json = await response.json()
            throw new Error(json.message || `Error fetching ${URL}/short`)
        }

        const json = await response.json()
        return json.data?.data || json.link || json
        
    } catch (error) {
        console.error('Error creating simple link', error)
        throw error
    }
}

const updateLink = async (linkId, updates) => {
    try {
        const response = await fetch(`${URL}/${linkId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        })

        if(!response.ok){
            const errorBody = await response.json().catch(() => ({}))
            throw new Error(errorBody.error || `Error al actualizar el link. Status: ${response.status}`)
        }

        const data = await response.json()
        
        return data.data?.data || data
    } catch (error) {
        console.error('Error updating the link', error)
        throw error
    }
}

const deleteLink = async (linkId) => { 
    try {
        const response = await fetch(`${URL}/${linkId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        if(!response.ok){
            const errorBody = await response.json().catch(() => ({}))
            throw new Error(errorBody.error || `Error al eliminar el link. Status: ${response.status}`)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('Error deleting link', error)
        throw error
    }
}

const migratePublicLink = async (linkId) => {
    try {
        const response = await fetch(`${URL}/migrate`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ linkId })
        })

        if (!response.ok) {
            const json = await response.json()
            console.error('Migration error response:', json)
            throw new Error(json.message || 'Error migrating link')
        }

        return response.json()
    } catch (error) {
        console.error('Error migrating public link:', error)
        throw error
    }
}

export {
    getUserLinks,
    addNewLink,
    addPublicLink,
    updateLink,
    deleteLink,
    migratePublicLink
}