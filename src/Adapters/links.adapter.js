
const linksListAdapter = async (linkListData) => {
	const linkList = linkListData.map(link => ({
		title: link.title,
		bigLink: link.big_link, 
		shorLink: link.short_link,
		alias: link.alias,
		icon: link.icon
}))
return linkList
}

const addLinkAdapter = async (linkData) => {
	const newLink = {
		id: linkData.id,
		title: linkData.title,
		bigLink: linkData.big_link,
		alias: linkData.alias,
		shortLink: linkData.short_link,
		icon: linkData.icon || ''
	}
	return newLink
}

const addPublicLinkAdapter = async (linkData) => {
	const newLink = {
		id: linkData.id,
		title: linkData.title,
		bigLink: linkData.big_link,
		alias: linkData.alias,
		shortLink: linkData.short_link,
		icon: linkData.icon || ''
	}
	return newLink
}
const updateLinkAdapter = async (linkData) => {
	const newLink = {
		id: linkData.id,
		title: linkData.title,
		bigLink: linkData.big_link,
		alias: linkData.alias,
		shortLink: linkData.short_link,
		icon: linkData.icon || ''
	}
	return newLink
}

export { 
	linksListAdapter,
	addLinkAdapter,
	addPublicLinkAdapter,
	updateLinkAdapter
}