import {createSlice} from "@reduxjs/toolkit";

type TokenConfig = {
    token:string,
    expires_at:string,
    lifetime:number
}
type InitialState = {
  isLoggedIn:boolean,
  loading:boolean,
  error:string, 
  token:TokenConfig | null
}

const initialState:InitialState = {
    isLoggedIn:false,
    loading:false,
    token:null,
    error:"",
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginReq:(state)=>{
            state.loading=true;
        },
        loginSuccess: (state, {payload})=>{
            state.loading=false;
            state.isLoggedIn = true;
            state.token=payload;
        },
        loginFail:(state,{payload})=>{
            state.loading=false;
            state.error=payload
        },
        logoutSuccess:(state)=>{
            state.loading=false;
            state.isLoggedIn=false;
        },
        clearError:(state)=>{
            state.error="";
        },
        clearToken:(state)=>{
            state.token = null;
        }
    }
})

export const {
    loginReq,
    loginFail,
    loginSuccess,
    logoutSuccess,
    clearToken,
    clearError
} = authSlice.actions

export default authSlice.reducer