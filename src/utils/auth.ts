import Cookies from "js-cookie"

const tokenName = "token"
const userName = "user"

export const setToken = (token: string) => {
    Cookies.set(tokenName, token)
}
export const deleteToken = () => Cookies.remove(tokenName)
export const getToken = () => {
    return Cookies.get(tokenName) || null   
}

export const getUserLocalStorage = () => JSON.parse(localStorage.getItem(userName))
export const setUserLocalStorage = (user: any) => localStorage.setItem(userName, JSON.stringify(user))
export const deleteUserLocalStorage = () => localStorage.removeItem(userName)