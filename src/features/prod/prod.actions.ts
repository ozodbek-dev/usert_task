import { Dispatch } from "@reduxjs/toolkit";
import { prodFail, prodReq, prodSuccess } from "./prod.slice";
import axios from 'axios'


export type BodyType = {
    username:string,
    password:string, 
}
export type DataType ={
   
}
const items  = [
  {
    id: 11121211,
      name: "Anor",
      price_uz: 0,
      price_$: 0,
      description: "Good",
  },
  {
    id: 111212112,
      name: "Alma",
      price_uz: 0,
      price_$: 0,
      description: "Good",
  }, {
    id: 11121213,
      name: "Padan",
      price_uz: 0,
      price_$: 0,
      description: "Good",
  }, {
    id: 11121241,
      name: "Anjir",
      price_uz: 0,
      price_$: 0,
      description: "Good",
  }, {
    id: 11121216,
      name: "Bodom",
      price_uz: 0,
      price_$: 0,
      description: "Good",
  }, {
    id: 11121216,
      name: "Balgar",
      price_uz: 0,
      price_$: 0,
      description: "Good",
  }, {
    id: 11121219,
      name: "Baliq",
      price_uz: 0,
      price_$: 0,
      description: "Good",
  },

]

export const getAllProds = (token:string)=>async(dispatch:Dispatch)=>{
  try {
    const config = {
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authorization":"Bearer " + token
      }
  }
    dispatch(prodReq());
    const response = await axios.get("https://toko.ox-sys.com/variations", config);
  if(response.data.items.length){
    const mappedProds = response.data.items.map((prod: any) => ({
      id: prod.id,
      name: prod.productName,
      price_uz: prod.stocks["0"].sellPrice?.UZS || 0,
      price_$: prod.stocks["0"].sellPrice?.USD || 0,
      description: prod.description || prod.shortDescription,
    }));
  dispatch(prodSuccess([...mappedProds,...items]))
  }
  } catch (err ) {
    if(err instanceof Error) dispatch(prodFail(err.message))
    else{
      console.log('Unexpected error', err);
      dispatch(prodFail("unexpected error"))
    }
    
  }
}

