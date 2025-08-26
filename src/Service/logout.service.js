export const logout = async () => {
    try {
    const res = await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include',
    })
    
    if (!res.ok) {
    throw new Error('Logout failed')
    }
    } catch (error) {
        console.log('Logout failed, error:', error)
        throw error
    }
}
