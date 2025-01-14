/*eslint no-useless-escape: "off"*/
const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=%]*)?$/

export const validateUrl = (url) => urlRegex.test(url)


const aliasRegex = /^[a-zA-Z0-9]{1,5}$/
export const validateAlias = (alias) => aliasRegex.test(alias)