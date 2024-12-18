import { useContext } from 'react'
import { LinksContext } from './LinksProvider.jsx'

export const useLinksManager = () =>  {
    return useContext(LinksContext)
}