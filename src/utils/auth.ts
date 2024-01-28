import Cookies from "js-cookie"

const tokenName = "token"
const userName = "user"

export const setToken = (token: string) => Cookies.set(tokenName, token)
export const deleteToken = () => Cookies.set(tokenName, '')
export const getToken = () => {
    console.log("getToken fn");
    
    return Cookies.get(tokenName)
}

export const getUserLocalStorage = () => JSON.parse(localStorage.getItem(userName))
export const setUserLocalStorage = (user: any) => localStorage.setItem(userName, JSON.stringify(user))
export const deleteUserLocalStorage = () => localStorage.removeItem(userName)