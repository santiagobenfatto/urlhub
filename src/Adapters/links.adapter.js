import { addNewLink as addNewLinkService,
	getLinkListById as getLinkListByIdService,
	addPublicLink as addPublicLinkService
} from '../Service/links.service.js'


const linksListAdapter = async (userId) => {
	const linkListData = await getLinkListByIdService(userId)
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
	const linkService = await addNewLinkService(linkData)
	const newLink = {
		id: linkService.id,
		title: linkService.title,
		bigLink: linkService.big_link,
		alias: `/${linkService.alias}`,
		shortLink: linkService.short_link,
		icon: linkService.icon || ''
	}
	return newLink
}


const addPublicLinkAdapter = async (linkData) => {
	const linkService = await addPublicLinkService(linkData)
	const newLink = {
		id: linkService.id,
		title: linkService.title,
		bigLink: linkService.big_link,
		alias: `/${linkService.alias}`,
		shortLink: linkService.short_link,
		icon: linkService.icon || ''
	}
	return newLink
}

export { 
	linksListAdapter,
	addLinkAdapter,
	addPublicLinkAdapter
}