import React, { createContext, useEffect, useState } from 'react'
import { savePublicLink, getPublicLink } from '../Utils/utils.js'

export const LinksContext = createContext()

const LinksProvider = ({children}) => {

    const [ urlData, setUrlData ] = useState(() => {
        const existing = getPublicLink()
        if (existing.length >= 1) {
            return existing[0]
        }
        return {
            id: '',
            bigLink: '',
            alias: '',
            title: '',
            icon: '',
            shortLink: ''
        }
    })
    
    const [ isEditting, setIsEditting ] = useState(false)
    const [ linkId, setLinkId ] = useState(null)

    const addShortURL = (linkData) => {
        setUrlData(prevData => ({...prevData, ...linkData}))
        savePublicLink(linkData)
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


