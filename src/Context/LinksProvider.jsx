import React, { createContext, useState } from 'react'

export const LinksContext = createContext()

const LinksProvider = ({children}) => {

    const [ urlData, setUrlData ] = useState({
        bigLink: '',
        shortLink: '',
    })

    const addShortURL = (linkData) => {
        setUrlData(prevData => ({...prevData, ...linkData}))
    }

    const contextValue = {
        urlData: urlData,
        addShortURL
    }


    return (
        <LinksContext.Provider value={contextValue}>
            {children}
        </LinksContext.Provider>
    )
}


export default LinksProvider


