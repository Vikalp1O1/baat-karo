import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isSignedIn: false,
  isLoggingIn: false,
  isUploadingProfile: false,
  isCheckAuth: true,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({
        authUser: response.data,
      });
    } catch (error) {
      console.log("Error checking authentication:", error);
      set({
        authUser: null,
      });
    } finally {
      set({
        isCheckAuth: false,
      });
    }
  },

  signup:async (data)=>{
    try {
        set({isSigningUp:true});
        const response = await axiosInstance.post("/auth/signup", data);
        toast.success("Account created successfully");
        set({
          authUser: response.data,
        });
    } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
    }
    finally {
        set({isSigningUp:false});
    }   
  },


    login:async (data)=>{
        set({isLoggingIn:true});
    try {
        const response = await axiosInstance.post("/auth/login", data);
        toast.success("Logged in successfully");
        set({
          authUser: response.data,
        });
    } catch (error) {
        // console.log("Login error:", error.response.data);
        toast.error(error.response.data.error || "Login failed");
    }
    finally {
        set({isLoggingIn:false});
    }
    },

  logout:async()=>{
    try {
     const logoutCheck= await axiosInstance.post("/auth/logout");
   
     set({
        authUser: null,
      });
      toast.success("Logged out successfully");
    } catch (error) {
     

      toast.error("Logout failed");    
    }
  },

  updateProfile: async (data)=>{
    set({isUpdatingProfile:true});
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({
        authUser: response.data,
      });
      console.log("Profile updated:", response.data.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Profile update error:", error.response.data);
      toast.error(error.response.data.error || "Profile update failed");
    } finally {
      set({isUpdatingProfile:false});
    }
  }

}));


export {useAuthStore};