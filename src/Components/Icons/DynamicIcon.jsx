import React from 'react'
import Icons from './Icons.jsx' 

const DynamicIcon = ({ iconName }) => {
    const IconComponent = Icons[iconName] 

    
    if (!IconComponent) {
        console.error(`No se encontró un ícono para "${iconName}"`)
        return null
    }

    return <IconComponent /> 
}

export default DynamicIcon
