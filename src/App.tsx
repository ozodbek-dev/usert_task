import React, { useEffect } from 'react';
import {ConfigProvider, Divider, Layout,} from 'antd'
import HeaderComp from "./components/Header";
import Footer from "./components/Footer";
import {Content} from "antd/es/layout/layout";
import Login from "./pages/Login";
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { checkIsAlreadyLoggedIn } from './features/auth/auth.actions';
import ProdsList from './pages/ProdsList';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [cookies, ] = useCookies(["token"])

  useEffect(()=>{
    if(cookies.token){
      dispatch(checkIsAlreadyLoggedIn(cookies.token))
      navigate("/prods")
    }
    else  {
      navigate('/')
    } 
  },[])

  if(loading) return <Loader/>

  return (
    <ConfigProvider>
      <Layout>
        <HeaderComp/>
          <Content style={{minHeight:"80vh", minWidth:"100vw", display:"grid",placeContent:'center', padding:"0 10vmax "}}>
            <Routes>
             <Route path='/prods'  element={<ProtectedRoute>
                    <ProdsList/>
              </ProtectedRoute>}/>
              <Route  path='/' element={<Login/>}/>
            </Routes>
          </Content>
          <Divider/>

          <Footer/>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
