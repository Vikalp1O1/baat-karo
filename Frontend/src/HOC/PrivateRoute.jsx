import React, { useEffect } from 'react'
import { useAuthStore } from '../store/userAuthStore'
import { Loader } from 'lucide-react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {

    const {authUser , isCheckAuth, checkAuth} = useAuthStore();

    useEffect(()=>{
        checkAuth();
    },[checkAuth]);

    if(isCheckAuth) return <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'></Loader>
      </div>

  return authUser ? children : <Navigate to="/login" replace />
    
  
}

export default PrivateRoute