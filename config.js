import dotenv from 'dotenv'

dotenv.config({
    path: '.env.local'
})

export default{
    loginURL: import.meta.env.LOGIN_URL,
    registerURL: import.meta.env.register_URL,
    linksURL: import.meta.env.SOCKET_URL
}
