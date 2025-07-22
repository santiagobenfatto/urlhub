import React, { createContext, useState } from 'react'

export const LinksContext = createContext()

const LinksProvider = ({children}) => {

    const [ urlData, setUrlData ] = useState({
        id: '',
        bigLink: '',
        alias: '',
        title: '',
        icon: '',
        shortLink: ''
    })
    
    const  [ isEditting, setIsEditting ] = useState(false)

    const [ linkId, setLinkId ] = useState(null)

    const addShortURL = (linkData) => {
        setUrlData(prevData => ({...prevData, ...linkData}))
    }

    const handleEditting = (inputId) => {
        if(linkId === inputId) {
            setLinkId(null)
            setIsEditting(false)
        } else {
            setLinkId(inputId)
            setIsEditting(true)
        }
    }

    const contextValue = {
        urlData: urlData,
        addShortURL,
        isEditting,
        handleEditting,
        linkId
    }


    return (
        <LinksContext.Provider value={contextValue}>
            {children}
        </LinksContext.Provider>
    )
}


export default LinksProvider


