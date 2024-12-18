import React, { createContext, useState } from 'react'

export const LinksContext = createContext()


const LinksProvider = ({children}) => {

    const [ isEditing, setIsEditing ] = useState(false)


    const handleCancel = () => {
        setIsEditing(false)
    }

    const handleEditing = () => {
        setIsEditing(true)
    }


    const contextValue = {
        handleCancel,
        handleEditing,
        isEditing: isEditing,
    }


    return (
        <LinksContext.Provider value={contextValue}>
            {children}
        </LinksContext.Provider>
    )
}


export default LinksProvider
