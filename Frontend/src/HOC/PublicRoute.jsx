import React, { useEffect } from 'react'
import { useAuthStore } from '../store/userAuthStore'
import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

function PublicRoute({children}) {

    const {authUser, isCheckAuth, checkAuth} = useAuthStore();

    useEffect(()=>{
        checkAuth();
    },[checkAuth]);


    if(isCheckAuth) return <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'></Loader>
      </div>


    
  return  !authUser ? children : <Navigate to="/" replace />
}

export default PublicRoute