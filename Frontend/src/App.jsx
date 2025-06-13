import Navbar from './Components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import SettingPage from './Pages/SettingPage'
import ProfilePage from './Pages/ProfilePage'
import { useAuthStore } from './store/userAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'
import {Loader} from 'lucide-react';
import {Toaster} from 'react-hot-toast';
import { use, useEffect } from 'react'




function App() {

  const {authUser,checkAuth,isCheckingAuth}= useAuthStore();

  const {theme} = useThemeStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

    useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // console.log("User:", authUser);

  if(isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'></Loader>
      </div>
    )
  }

  return (
    <>
    {/* <div data-theme ={theme}></div> */}
   <Navbar />
   <Routes>
    
  <Route path='/' element={ authUser ? <HomePage />: <Navigate to='/login'></Navigate>}></Route>
   <Route path='/signup' element={ !authUser ? <SignupPage /> : <Navigate to='/' />}></Route>
 <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/'/>}></Route>
 <Route path='/setting' element={ authUser ? <SettingPage /> : <Navigate to='/login' />}></Route>
 <Route path='/profile' element={ authUser ? <ProfilePage /> : <Navigate to='/login' ></Navigate>}></Route>
 
   </Routes>

   <Toaster></Toaster>
    </>
  )
}

export default App
