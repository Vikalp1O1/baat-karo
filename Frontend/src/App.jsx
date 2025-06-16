import Navbar from "./Components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/userAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { lazy,Suspense, useEffect } from "react";
import PrivateRoute from "./HOC/PrivateRoute.jsx";
import PublicRoute from "./HOC/PublicRoute.jsx";

const HomePage = lazy(()=>import('./Pages/HomePage.jsx'));
const SignupPage = lazy(()=>import('./Pages/SignupPage.jsx'));
const LoginPage = lazy(()=>import('./Pages/LoginPage.jsx'));
const SettingPage = lazy(()=>import('./Pages/SettingPage.jsx'));
const ProfilePage = lazy(()=>import('./Pages/ProfilePage.jsx'));


function App() {
  // const {authUser,checkAuth,isCheckingAuth, onlineUsers}= useAuthStore();

  const { theme } = useThemeStore();

  // useEffect(() => {
  //   checkAuth();
  // },[checkAuth]);

  // console.log("check auth",onlineUsers);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // console.log("User:", authUser);

  // if(isCheckingAuth && !authUser) {
  //   return (
  //     <div className='flex items-center justify-center h-screen'>
  //       <Loader className='size-10 animate-spin'></Loader>
  //     </div>
  //   )
  // }

  return (
    <>
      {/* <div data-theme ={theme}></div> */}
      <Navbar />
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><Loader className="size-10 animate-spin" /></div>}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <HomePage />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              {" "}
              <SignupPage />{" "}
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              {" "}
              <LoginPage />{" "}
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/setting"
          element={
            <PrivateRoute>
              {" "}
              <SettingPage />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              {" "}
              <ProfilePage />{" "}
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      </Suspense>
      <Toaster></Toaster>
    </>
  );
}

export default App;
