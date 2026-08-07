const serverURL = import.meta.env.VITE_API_SERVER_URL

const resolveAlias = async (alias) => {
    try {
        const response = await fetch(`${serverURL}/${alias}`)
        if (!response.ok) {
            throw new Error(`Error resolving alias. Status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error in resolveAlias:', error)
        throw error
    }
}

export { resolveAlias }
