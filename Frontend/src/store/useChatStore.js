import { create } from "zustand";

import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./userAuthStore";
export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isMessagesLoading: false,
  isUsersLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/message/user");
      set({
        users: response.data.data,
      });
      // console.log("Users fetched successfully:", response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async(userId)=>{
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      set({
        messages: response.data.data,
      });
        console.log("API response from /message:", response.data)
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages:async (messageData)=>{
    const {selectedUser , messages} =get();
    try{
      const response =  await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      console.log(response.data.data);
      set({
        messages: [...messages, response.data.data],

      });
      
      console.log("messages",messages);
      // set({selectedUser:selectedUser._id})
      
      // console.log("messages data",response.config.data );
    }
    catch(error){
      toast.error("Failed to send message");
    }
  },

  subscribeToMessages:()=>{
    const {selectedUser} = get();

    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on('newMessage',(newMessage)=>{
      set({
        messages: [...get().messages,newMessage],
      })
    })
  },

  unsubscribeFromMessages: ()=>{
    const socket = useAuthStore.getState().socket;

    socket.off('newMessage');
  },

  setSelectedUser: (selectedUser) => {
    if (selectedUser) {
    localStorage.setItem("lastSelectedUser", JSON.stringify(selectedUser));
  } else {
    localStorage.removeItem("lastSelectedUser");
  }
  set({ selectedUser });
  },



}));
