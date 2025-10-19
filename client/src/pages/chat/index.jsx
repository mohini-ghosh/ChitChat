//revised till 5 hr contacts click korle chat open hbe r close korle close hbe
import { useAppStore } from '@/store'
import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './components/contacts-container';
import EmptyChatContainer from './components/empty-chat-container';
import ChatContainer from './components/chat-container';

const Chat=() =>{
  
   const {userInfo, selectedChatData}= useAppStore();
   const navigate= useNavigate();

   useEffect(()=>{
   if (!userInfo?.profileSetup) {
   toast("Please setup profile to continue");
   navigate("/profile");
   }
}, [userInfo, navigate]);

   return (
   //  sir r choleni
   //  <div className='h-[100vh] text-white overflow-hidden'>
   //   <ContactsContainer/>
   //    <EmptyChatContainer/>
   //    <ChatContainer/>
   // </div>

   
      <div className="h-[100vh] text-white flex bg-[#1c1d25] overflow-hidden">
      {/* Sidebar with contacts */}
      <div className="w-[350px] ">
        <ContactsContainer />
      </div>

      <div className="flex-1">
        {selectedChatData ? (
          <ChatContainer />   // shows chat when one is selected
        ) : (
          <EmptyChatContainer /> // otherwise shows empty state
        )}
      </div>
    </div>


   )
}


export default Chat


