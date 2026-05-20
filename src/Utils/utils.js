const savePublicLink = (link) => {
  localStorage.setItem('publicLinks', JSON.stringify([link]))
}

const getPublicLink = () => {
  return JSON.parse(localStorage.getItem('publicLinks')) || []
}


export { 
    savePublicLink,
    getPublicLink
}