import {createSlice} from "@reduxjs/toolkit";

type InitialState = {
  loading:boolean,
  error:string, 
  prods:any,
  fillteredProds:any
}

const initialState:InitialState = {
    loading:false,
    prods:[],
    fillteredProds:[],
    error:"",
}

const prodSlice = createSlice({
    name:"prod",
    initialState,
    reducers:{
        prodReq:(state)=>{
            state.loading=true;
        },
        prodSuccess: (state, {payload})=>{
            state.loading=false;
            state.fillteredProds = payload;
            state.prods = payload;
        },
        prodFail:(state,{payload})=>{
            state.loading=false;
            state.error=payload
        },
        searchProd:(state,{payload})=>{
          state.loading = false;
          state.fillteredProds = payload;
        },
        clearError:(state)=>{
            state.error="";
        },
    }
})

export const {
    prodReq,
    prodFail,
    prodSuccess,
    searchProd,
    clearError
} = prodSlice.actions

export default prodSlice.reducer