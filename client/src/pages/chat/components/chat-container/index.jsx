// import React from 'react'
// import MessageBar from './components/Message-bar'
// import MessageContainer from './components/Message-container'
// import ChatHeader from './components/Chat-header'


// const ChatContainer = () => {
//   return (
//     <div className=' relative flex flex-col flex-1 h-full bg-[#1c1d25]'>
//         <ChatHeader/>
//         <MessageContainer/> 
//         <MessageBar/>
//     </div>
//   )
// }

// export default ChatContainer

import React from "react";
import { useAppStore } from "@/store";
import ChatHeader from "./components/Chat-header";
import MessageContainer from "./components/Message-container";
import MessageBar from "./components/Message-bar";
import EmptyChatContainer from "../empty-chat-container";

const ChatContainer = () => {
  const { selectedChatData } = useAppStore();

  if (!selectedChatData) return <EmptyChatContainer />;

  return (
    <div className="flex flex-col h-full bg-[#1c1d25]">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto">
        <MessageContainer />
      </div>
      <MessageBar />
    </div>
  );
};

export default ChatContainer;
