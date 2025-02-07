import React, { useContext } from 'react'
import { LinksContext } from './LinksProvider'

export const useLink = () => {
    return useContext(LinksContext)
}