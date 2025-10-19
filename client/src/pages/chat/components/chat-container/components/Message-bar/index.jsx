
//best till 5hr 29 min

// import React, { useEffect, useRef, useState } from 'react'
// import { GrAttachment } from 'react-icons/gr'
// import { RiEmojiStickerLine } from 'react-icons/ri'
// import { IoSend } from 'react-icons/io5'
// import EmojiPicker from 'emoji-picker-react'
// import { Socket } from 'socket.io-client'
// import { Content } from '@radix-ui/react-dialog'
// import { useSocket } from '@/context/SocketContext'
// import { useAppStore } from '@/store'
// // import { document } from 'postcss'

// const MessageBar = () => {
//   const emojiRef= useRef();
//   const socket= useSocket();
//   const {selectedChatType, selectedChatData, userInfo} = useAppStore();
//   const [message, setMessage] = useState("");
//   const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (emojiRef.current && !emojiRef.current.contains(event.target)) {
//         setEmojiPickerOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [emojiRef]);

//   const handleAddEmoji=(emoji) => {
//     setMessage((msg) =>msg+ emoji.emoji);
//   };

//   const handleSendMessage =async () =>{
//     if (!message.trim()) return;

//      if(selectedChatType==="contact" && socket) socket.emit("sendMessage",{
//        sender: userInfo.id,
//        content: message,
//        recipient: selectedChatData._id,
//        messageType: "text",
//        fileUrl: undefined,
//      });
//      setMessage("");  //gpt thke add for clearing input after sending
//   }

//   return (
//   <div className="sticky bottom-4 left-0 w-full flex justify-center px-8">
//     <div className="flex items-center gap-3 w-full max-w-3xl">
//       <div className="flex flex-1 bg-[#2a2b33] rounded-md items-center gap-5 pr-5 py-3">
//         <input
//           type="text"
//           className="flex-1 bg-transparent rounded-md focus:outline-none px-3"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
//           <GrAttachment className="text-2xl" />
//         </button>

//         <div className="relative">
//            <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
//             onClick={() => setEmojiPickerOpen(true)}>
//             <RiEmojiStickerLine className='text-2xl'/>
//            </button>
//            <div className='absolute bottom-16 right-0' ref={emojiRef}>
//             <EmojiPicker theme='dark' open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false}/>
//            </div>
//         </div>
//       </div>
//      <button className='bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all'
//      onClick={handleSendMessage}
//      >
//             <IoSend className='text-2xl'/>
//      </button>
//     </div>
//     </div>
//   );
// };

// export default MessageBar


// messagebar.js  ata last 
// import React, { useEffect, useRef, useState } from "react";
// import { GrAttachment } from "react-icons/gr";
// import { RiEmojiStickerLine } from "react-icons/ri";
// import { IoSend } from "react-icons/io5";
// import EmojiPicker from "emoji-picker-react";
// import { useSocket } from "@/context/SocketContext";
// import { useAppStore } from "@/store";

// const MessageBar = () => {
//   const emojiRef = useRef();
//   const socket = useSocket();
//   const { selectedChatType, selectedChatData, userInfo, addMessage } = useAppStore();

//   const [message, setMessage] = useState("");
//   const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (emojiRef.current && !emojiRef.current.contains(event.target)) {
//         setEmojiPickerOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleAddEmoji = (emoji) => setMessage((msg) => msg + emoji.emoji);

//   const handleSendMessage = () => {
//     if (!message.trim() || !selectedChatData) return;

//     const msgData = {
//       sender: userInfo.id,
//       recipient: selectedChatData._id,
//       content: message,
//       messageType: "text",
//       fileUrl: null,
//     };

//     console.log("📤 Sending message:", msgData);
//     // socket.emit("sendMessage", msgData);
//     socket.emit("sendMessage", {
//   sender: userInfo._id || userInfo.id,
//   recipient: selectedChatData._id || selectedChatData.id,
//   content: message,
//   timestamp: new Date(),
//   localId: `${Date.now()}-${Math.random()}`,
// });
//     addMessage(msgData);
//     setMessage("");
//   };

//   return (
//     <div className="sticky bottom-4 left-0 w-full flex justify-center px-8">
//       <div className="flex items-center gap-3 w-full max-w-3xl">
//         <div className="flex flex-1 bg-[#2a2b33] rounded-md items-center gap-5 pr-5 py-3">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 bg-transparent rounded-md focus:outline-none px-3"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <GrAttachment className="text-2xl text-neutral-500 hover:text-white transition-all" />
//           <div className="relative">
//             <RiEmojiStickerLine
//               className="text-2xl text-neutral-500 hover:text-white transition-all cursor-pointer"
//               onClick={() => setEmojiPickerOpen((prev) => !prev)}
//             />
//             {emojiPickerOpen && (
//               <div ref={emojiRef} className="absolute bottom-16 right-0">
//                 <EmojiPicker theme="dark" onEmojiClick={handleAddEmoji} />
//               </div>
//             )}
//           </div>
//         </div>
//         <button
//           className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] transition-all"
//           onClick={handleSendMessage}
//         >
//           <IoSend className="text-2xl" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MessageBar;

//atai last r porer ta user a mesg kor6e sender r k6e dubar dekh66e but recvr one time p66e also console a  dekha66e sending mesg guloke send mesg dekh66e na incoming
import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useSocket } from "@/context/SocketContext";
import { useAppStore } from "@/store";

const MessageBar = () => {
  const emojiRef = useRef();
  const socket = useSocket();
  const { selectedChatType, selectedChatData, userInfo, addMessage } = useAppStore();

  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddEmoji = (emoji) => setMessage((msg) => msg + emoji.emoji);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChatData) return;

    const msgData = {
      sender: userInfo._id || userInfo.id,
      recipient: selectedChatData._id || selectedChatData.id,
      content: message.trim(),
      messageType: "text",
      fileUrl: null,
      timestamp: new Date(),
      localId: `${Date.now()}-${Math.random()}`,
    };

    // Add immediately (optimistic UI)
    addMessage(msgData);

    // Send to server
    socket.emit("sendMessage", msgData);

    setMessage("");
  };

  return (
    <div className="sticky bottom-4 left-0 w-full flex justify-center px-8">
      <div className="flex items-center gap-3 w-full max-w-3xl">
        <div className="flex flex-1 bg-[#2a2b33] rounded-md items-center gap-5 pr-5 py-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent rounded-md focus:outline-none px-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <GrAttachment className="text-2xl text-neutral-500 hover:text-white transition-all" />
          <div className="relative">
            <RiEmojiStickerLine
              className="text-2xl text-neutral-500 hover:text-white transition-all cursor-pointer"
              onClick={() => setEmojiPickerOpen((prev) => !prev)}
            />
            {emojiPickerOpen && (
              <div ref={emojiRef} className="absolute bottom-16 right-0">
                <EmojiPicker theme="dark" onEmojiClick={handleAddEmoji} />
              </div>
            )}
          </div>
        </div>
        <button
          className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] transition-all"
          onClick={handleSendMessage}
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;

