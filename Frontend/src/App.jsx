import Navbar from "./Components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/userAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useContext, useEffect } from "react";
import PrivateRoute from "./HOC/PrivateRoute.jsx";
import PublicRoute from "./HOC/PublicRoute.jsx";
import { ThemeContextChange } from "./Components/ThemeContext.jsx";
import MainLayout from "./HOC/MainLayout.jsx";

const HomePage = lazy(() => import("./Pages/HomePage.jsx"));
const SignupPage = lazy(() => import("./Pages/SignupPage.jsx"));
const LoginPage = lazy(() => import("./Pages/LoginPage.jsx"));
const SettingPage = lazy(() => import("./Pages/SettingPage.jsx"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage.jsx"));

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
      

      <Routes>
        
        <Route path="/" element={<PrivateRoute> <MainLayout /> </PrivateRoute>}>

        
          <Route
            index
            element={
              <PrivateRoute>
                <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Loader className="size-10 animate-spin" />
            </div>
          }
        >
                <HomePage />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/setting"
            element={
              <PrivateRoute>
                <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Loader className="size-10 animate-spin" />
            </div>
          }
        >
                <SettingPage />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
        
        
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Loader className="size-10 animate-spin" />
            </div>
          }
        >
                <ProfilePage />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
        </Route>
        
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Loader className="size-10 animate-spin" />
            </div>
          }
        >
                <SignupPage />
                </Suspense>
              </PublicRoute>
            }
          ></Route>
        
        
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Loader className="size-10 animate-spin" />
            </div>
          }
        >
                <LoginPage />
                </Suspense>
              </PublicRoute>
            }
          ></Route>
        
        
          
        
      </Routes>

      <Toaster></Toaster>
    </>
  );
}

export default App;
