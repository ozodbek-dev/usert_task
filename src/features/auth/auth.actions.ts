import { Dispatch } from "@reduxjs/toolkit";
import { loginFail, loginReq, loginSuccess, logoutSuccess } from "./auth.slice";
import axios from 'axios'

const loginConfig = {
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "Accept":"application/json"
    }
}

export type BodyType = {
    username:string,
    password:string, 
}
export type DataType ={
   
}

export const login = ({username,password}:BodyType)=>async(dispatch:Dispatch)=>{
    try{
        dispatch(loginReq());
       const response = await axios.post("https://toko.ox-sys.com/security/auth_check",{
       _username:username,
       _password:password,
       _subdomain:"toko",
       },
       loginConfig);
      dispatch(loginSuccess(response.data))
        }
       catch(err){
        if (err instanceof Error) {
            dispatch(loginFail(err.message));
          } else {
            console.log('Unexpected error', err);
            loginFail("unexpected error")
          }
       }
}

export const logout = ()=>async(dispatch:Dispatch)=>{
    dispatch(loginReq())
    setTimeout(() => {
        dispatch(logoutSuccess())
    }, 1000);
}
export const checkIsAlreadyLoggedIn = (token:string)=>async(dispatch:Dispatch)=>{
    const checkConfig = {
        headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    }
    try{
        dispatch(loginReq());
       const response = await axios.get("https://toko.ox-sys.com/variations",checkConfig);
      dispatch(loginSuccess(response.data))
        }
       catch(err){
        if (err instanceof Error) {
            dispatch(loginFail(err.message));
          } else {
            console.log('Unexpected error', err);
            dispatch(loginFail("unexpected error"))
          }
       }
}
