import React, { useContext } from 'react'
import { LinksContext } from './LinksProvider.jsx'

export const useLink = () => {
    return useContext(LinksContext)
}