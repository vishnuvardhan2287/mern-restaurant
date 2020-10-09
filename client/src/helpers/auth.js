import {setCookie, getCookie} from './cookies';
import {setLocalStorage, getLocalStorage} from './localStorage';

export const setAuthentication = (token,user) =>{
    setCookie('token', token);
    setLocalStorage('user', user)
}

export const isAuthenticated = (key) =>{
     if(getCookie('token') && getLocalStorage('user')){
         return getLocalStorage('user')
     } else{
         return false
     }
}