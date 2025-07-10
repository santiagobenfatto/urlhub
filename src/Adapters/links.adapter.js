import { getLinkListById } from "../Service/linksList.service"

//getLinkListById()
export const linksListAdapter = async (userId) => {
	const linkListData = await getLinkListById(userId)
	const linkList = linkListData.map(link => ({
		name: link.name,
		bigLink: link.big_link, 
		shorLink: link.short_link,
		alias: link.alias,
		icon: link.icon
}))

return linkList
}

//addNewLink() 
export const addLinkAdapter = (linkData) => ({
	id: linkData.id,
	name: linkData.name,
	bigLink: linkData.big_link,
	alias: `/${linkData.alias}`,
	shortLink: linkData.short_link,
	icon: linkData.icon || ''
})

//createPublicLink()
export const addPublicLink = () => ({
//
})