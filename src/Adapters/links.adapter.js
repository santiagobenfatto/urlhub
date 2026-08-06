import { buildShortUrl } from '../Utils/shortLink.js'

const linksListAdapter = async (linkListData) => {
	const linkList = linkListData.map(link => ({
		id: link.id,
		title: link.title,
		bigLink: link.big_link, 
		shortLink: buildShortUrl(link.alias),
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
		shortLink: buildShortUrl(linkData.alias),
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
		shortLink: buildShortUrl(linkData.alias),
		icon: linkData.icon || ''
	}
	return newLink
}

export { 
	linksListAdapter,
	addLinkAdapter,
	updateLinkAdapter
}