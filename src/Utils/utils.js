const savePublicLink = (link) => {
  localStorage.setItem('publicLinks', JSON.stringify([link]))
}

const getPublicLink = () => {
  return JSON.parse(localStorage.getItem('publicLinks')) || []
}

const removePublicLink = () => {
  localStorage.removeItem('publicLinks')
}

export { 
    savePublicLink,
    getPublicLink,
    removePublicLink
}