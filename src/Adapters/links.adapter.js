
const linksListAdapter = async (linkListData) => {
	const linkList = linkListData.map(link => ({
		id: link.id,
		title: link.title,
		bigLink: link.big_link, 
		shortLink: link.shortLink || link.short_link,
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

const addPublicLinkAdapter = (linkData) => {
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