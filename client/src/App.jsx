import React, { Children, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useState } from 'react';
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/chat';
import Auth from './pages/auth';
import Profile from './pages/profile';
import { useAppStore } from './store';
import { apiClient } from './lib/apiclient';
import { GET_USER_INFO } from './utils/constants';

const PrivateRoute=({children}) =>{
  const {userInfo}= useAppStore();
  const isAuthenticated= !!userInfo;
  return isAuthenticated ? children:<Navigate to='/auth' />;
}

const AuthRoute=({children}) =>{
  const {userInfo}= useAppStore();
  const isAuthenticated= !!userInfo;
  // return isAuthenticated ? <Navigate to='/auth' />:children;
  return userInfo ? <Navigate to="/chat" /> : children; //gpt
}

const App = () => {
  const {userInfo, setUserInfo} =useAppStore();
  const [loading, setloading] = useState(true)

  useEffect(()=>{
    const getUserData = async ()=>{
       try{
        const response =await apiClient.get(GET_USER_INFO,{
           withCredentials:true,
        });
        if(response.status==200 && response.data.id){

         setUserInfo(response.data);
        }
        else {
          setUserInfo(undefined);
        }

        console.log({response});
        //  setUserInfo(data.user); 
        setUserInfo(response.data);
       } catch(error){
          setUserInfo(undefined);
        } finally{
          setloading(false);
        }
      };
      if(!userInfo)getUserData();
      else setloading(false)
  
  },[userInfo, setUserInfo])
  if(loading)return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthRoute>
          <Auth/>
        </AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute>
          <Chat/>
        </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute>
          <Profile/>
        </PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

