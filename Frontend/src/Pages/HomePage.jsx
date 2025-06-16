import React from 'react'
import { useChatStore } from '../store/useChatStore';
import NoChatSelected from '../Components/NoChatSelected';
import ChatContainer from '../Components/ChatContainer';
import Sidebar from '../Components/Sidebar';
import { useEffect } from 'react';

function HomePage() {

  const {selectedUser, setSelectedUser} = useChatStore();

  useEffect(() => {
    const lastSelectedUser = localStorage.getItem("lastSelectedUser");
    if (lastSelectedUser) {
      setSelectedUser(JSON.parse(lastSelectedUser));
    }
  }, [setSelectedUser]);

  return (
   <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage