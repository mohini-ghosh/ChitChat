// import React, { useRef, useEffect } from "react";
// import { useAppStore } from "@/store";
// import moment from "moment";

// const MessageContainer = () => {
//   const scrollRef = useRef();
//   const { selectedChatType, userInfo, selectedChatMessages } = useAppStore();

//   // auto-scroll
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [selectedChatMessages]);

//   const renderDMMessages = (msg) => {
//     // Normalize sender id
//     const senderId =
//       msg.sender?._id || msg.sender?.id || msg.sender; // server sends _id or id
//     const userId = userInfo?._id || userInfo?.id; // current user may have id only

//     const isOwnMessage = String(senderId) === String(userId);

//     return (
//       <div
//         className={`flex my-2 w-full ${
//           isOwnMessage ? "justify-end" : "justify-start"
//         }`}
//       >
//         <div
//           className={`flex items-end gap-2 max-w-[70%] ${
//             isOwnMessage ? "flex-row-reverse" : "flex-row"
//           }`}
//         >
//           <div
//             className={`px-4 py-2 rounded-2xl break-words ${
//               isOwnMessage
//                 ? "bg-[#8417ff]/20 text-[#8417ff]/90"
//                 : "bg-[#2a2b33]/50 text-white/90"
//             }`}
//           >
//             {msg.content}
//           </div>
//           <div className="text-xs text-gray-400 whitespace-nowrap">
//             {moment(msg.timestamp).format("LT")}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderMessages = () => {
//     let lastDate = null;

//     return selectedChatMessages.map((msg) => {
//       const messageDate = moment(msg.timestamp).format("YYYY-MM-DD");
//       const showDate = messageDate !== lastDate;
//       lastDate = messageDate;

//       return (
//         <div key={msg.localId || msg._id}>
//           {showDate && (
//             <div className="text-center text-gray-400 my-3 text-sm">
//               {moment(msg.timestamp).format("LL")}
//             </div>
//           )}
//           {selectedChatType === "contact" && renderDMMessages(msg)}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8">
//       {renderMessages()}
//       <div ref={scrollRef}></div>
//     </div>
//   );
// };

// export default MessageContainer;


// message-container.jsx  ata last(ata te r last rporer code nei dekh6i)
// import React, { useRef, useEffect } from "react";
// import { useAppStore } from "@/store";
// import moment from "moment";

// const MessageContainer = () => {
//   const scrollRef = useRef();
//   const { selectedChatType, userInfo, selectedChatMessages } = useAppStore();

//   // auto-scroll
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [selectedChatMessages]);

//   const renderDMMessages = (msg) => {
//     // Normalize sender id
//     const senderId =
//       msg.sender?._id || msg.sender?.id || msg.sender; // server sends _id or id
//     const userId = userInfo?._id || userInfo?.id; // current user may have id only

//     const isOwnMessage = String(senderId) === String(userId);

//     return (
//       <div
//         className={`flex my-2 w-full ${
//           isOwnMessage ? "justify-end" : "justify-start"
//         }`}
//       >
//         <div
//           className={`flex items-end gap-2 max-w-[70%] ${
//             isOwnMessage ? "flex-row-reverse" : "flex-row"
//           }`}
//         >
//           <div
//             className={`px-4 py-2 rounded-2xl break-words ${
//               isOwnMessage
//                 ? "bg-[#8417ff]/20 text-[#8417ff]/90"
//                 : "bg-[#2a2b33]/50 text-white/90"
//             }`}
//           >
//             {msg.content}
//           </div>
//           <div className="text-xs text-gray-400 whitespace-nowrap">
//             {moment(msg.timestamp).format("LT")}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderMessages = () => {
//     let lastDate = null;

//     return selectedChatMessages.map((msg) => {
//       const messageDate = moment(msg.timestamp).format("YYYY-MM-DD");
//       const showDate = messageDate !== lastDate;
//       lastDate = messageDate;

//       return (
//         <div key={msg.localId || msg._id}>
//           {showDate && (
//             <div className="text-center text-gray-400 my-3 text-sm">
//               {moment(msg.timestamp).format("LL")}
//             </div>
//           )}
//           {selectedChatType === "contact" && renderDMMessages(msg)}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8">
//       {renderMessages()}
//       <div ref={scrollRef}></div>
//     </div>
//   );
// };

// export default MessageContainer;


import React, { useRef, useEffect } from "react";
import { useAppStore } from "@/store";
import moment from "moment";
import { apiClient } from "@/lib/apiclient";
import { GET_MESSAGES_ROUTE } from "@/utils/constants";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, 
    userInfo, selectedChatMessages, setSelectChatMessages }
     = useAppStore();
  // const selectedChatType = useAppStore((state) => state.selectedChatType);
  // const selectedChatData = useAppStore((state) => state.selectedChatData);
  // const userInfo = useAppStore((state) => state.userInfo);
  // const selectedChatMessages = useAppStore((state) => state.selectedChatMessages);
  // const setSelectedChatMessages = useAppStore((state) => state.setSelectedChatMessages);
  
  useEffect(() => {
    const getMessages= async()=>{
      try {
        const response= await apiClient.post(GET_MESSAGES_ROUTE, {id:selectedChatData._id}, {withCredentials:true});
        if(response.data?.messages) {
          setSelectChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    }
     // fetch messages when chat opens or reloads
    // if(selectedChatData._id) {
    //   if(selectedChatType === "contact") {
    //     getMessages();
    //   }
    // }
    //gpt 
    if (selectedChatData?._id && selectedChatType === "contact") {
      getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectChatMessages]);

  // auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);
  useEffect(() => {
      console.log("Selected Chat Messages:", selectedChatMessages);
      console.log("Selected Chat Data:", selectedChatData);
  },[]);

  const renderDMMessages = (msg) => {
    // Normalize sender id
    const senderId =
      msg.sender?._id || msg.sender?.id || msg.sender; // server sends _id or id
    const userId = userInfo?._id || userInfo?.id; // current user may have id only

    const isOwnMessage = String(senderId) === String(userId);

    return (
      <div
        className={`flex my-2 w-full ${
          isOwnMessage ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex items-end gap-2 max-w-[70%] ${
            isOwnMessage ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl break-words ${
              isOwnMessage
                ? "bg-[#8417ff]/20 text-[#8417ff]/90"
                : "bg-[#2a2b33]/50 text-white/90"
            }`}
          >
            {msg.content}
          </div>
          <div className="text-xs text-gray-400 whitespace-nowrap">
            {moment(msg.timestamp).format("LT")}
          </div>
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessages.map((msg) => {
      const messageDate = moment(msg.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={msg.localId || msg._id}>
          {showDate && (
            <div className="text-center text-gray-400 my-3 text-sm">
              {moment(msg.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(msg)}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8">
      {renderMessages()}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default MessageContainer;
