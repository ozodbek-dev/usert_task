import React from 'react'
import { useAppSelector } from '../app/hooks'
import { Navigate } from 'react-router-dom';
interface Childtype {
  children:JSX.Element
}

export default function ProtectedRoute({children}:Childtype) {
  const {isLoggedIn} = useAppSelector(state=>state.auth);
  if(!isLoggedIn) return <Navigate to={"/"} replace={true}/>
  return children
}
