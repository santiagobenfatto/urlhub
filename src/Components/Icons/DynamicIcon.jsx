import React from 'react'
import Icons from './Icons.jsx'

const DynamicIcon = ({ iconName }) => {
    const iconData = Icons.find(icon => icon.name === iconName)

    if (!iconData) {
        console.error(`No se encontró un ícono para "${iconName}"`)
        return null
    }

    const IconComponent = iconData.Component

    return <IconComponent />
}

export default DynamicIcon
