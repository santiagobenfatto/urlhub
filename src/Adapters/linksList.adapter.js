export const linksListAdapter = (linkListData) => {
    const linkList = linkListData.map(link => ({
        name: link.name,
        bigLink: link.big_link, 
        shorLink: link.short_link,
        alias: link.alias,
        icon: link.icon,
        qrLink: link.qr_link
    }))

    return linkList
    
}

