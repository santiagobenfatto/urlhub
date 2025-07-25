const savePublicLink = (link) => {
  const links = JSON.parse(localStorage.getItem('publicLinks')) || []
  localStorage.setItem('publicLinks', JSON.stringify([...links, link]))
}

const getPublicLink = () => {
  return JSON.parse(localStorage.getItem('publicLinks')) || []
}


export { 
    savePublicLink,
    getPublicLink
}