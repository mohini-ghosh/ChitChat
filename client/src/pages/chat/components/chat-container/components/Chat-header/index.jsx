
// import React from "react";
// import { RiCloseFill } from "react-icons/ri";
// import { useAppStore } from "@/store";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { getColor } from "@/lib/utils";

// const ChatHeader = () => {
//   const { closeChat, selectedChatData } = useAppStore();

//   // 🛡️ If no chat selected, render nothing or fallback UI
//   if (!selectedChatData) {
//     return (
//       <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-center text-neutral-400">
//         Select a chat to start messaging
//       </div>
//     );
//   }

//   return (
//     <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
//       <div className="flex gap-5 items-center">
//         {/* Avatar */}
//         <div className="w-12 h-12 relative">
//           <Avatar className="w-12 h-12 rounded-full overflow-hidden">
//             {selectedChatData.image ? (
//               <AvatarImage
//                 src={`${import.meta.env.VITE_SERVER_URL}${selectedChatData.image}`}
//                 alt="Profile"
//                 className="w-full h-full object-cover bg-black"
//               />
//             ) : (
//               <div
//                 className={`uppercase w-12 h-12 text-lg border flex items-center justify-center text-white rounded-full ${getColor(
//                   selectedChatData.selectedcolor
//                 )}`}
//               >
//                 {selectedChatData.firstname
//                   ? selectedChatData.firstname.charAt(0)
//                   : selectedChatData.email.charAt(0)}
//               </div>
//             )}
//           </Avatar>
//         </div>

//         {/* Name */}
//         <div className="flex flex-col">
//           <span className="text-white font-medium">
//             {selectedChatData.firstname && selectedChatData.lastname
//               ? `${selectedChatData.firstname} ${selectedChatData.lastname}`
//               : selectedChatData.firstname || selectedChatData.email}
//           </span>
//         </div>
//       </div>

//       {/* Close button */}
//       <div className="flex items-center justify-center gap-5">
//         <button
//           onClick={closeChat}
//           className="text-neutral-500 focus:outline-none hover:text-white duration-300 transition-all"
//         >
//           <RiCloseFill className="text-3xl" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;


//revised till 5 hr contacts click korle chat open hbe r close korle close hbe
// import React from "react";
// import { RiCloseFill } from "react-icons/ri";
// import { useAppStore } from "@/store";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { getColor } from "@/lib/utils";

// const ChatHeader = () => {
//   const { selectedChat, setSelectedChat } = useAppStore();

//   if (!selectedChat) {
//     return (
//       <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-center text-neutral-400">
//         Select a chat to start messaging
//       </div>
//     );
//   }

//   return (
//     <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center px-5 gap-4">
//       {/* Profile logo */}
//       <div className="w-12 h-12 relative">
//         <Avatar className="w-12 h-12 rounded-full overflow-hidden">
//           {selectedChat.image ? (
//             <AvatarImage
//               src={`${import.meta.env.VITE_SERVER_URL}${selectedChat.image}`}
//               alt="Profile"
//               className="w-full h-full object-cover bg-black"
//             />
//           ) : (
//             <div
//               className={`uppercase w-12 h-12 text-lg border flex items-center justify-center text-white rounded-full ${getColor(
//                 selectedChat.selectedcolor
//               )}`}
//             >
//               {selectedChat.firstname
//                 ? selectedChat.firstname.charAt(0)
//                 : selectedChat.email.charAt(0)}
//             </div>
//           )}
//         </Avatar>
//       </div>

//       {/* Name + close button together */}
//       <div className="flex items-center gap-2">
//         <span className="text-white font-medium">
//           {selectedChat.firstname && selectedChat.lastname
//             ? `${selectedChat.firstname} ${selectedChat.lastname}`
//             : selectedChat.firstname || selectedChat.email}
//         </span>

//         <button
//           onClick={() => setSelectedChat(null)}
//           className="text-neutral-500 focus:outline-none hover:text-white duration-300 transition-all"
//         >
//           <RiCloseFill className="text-2xl" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;

import React from "react";
import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { IoClose } from "react-icons/io5";

const ChatHeader = () => {
  const { selectedChatData, closeChat } = useAppStore();

  if (!selectedChatData) return null;

  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-[#2f303b] bg-[#1b1c24]">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 rounded-full overflow-hidden">
          {selectedChatData.image ? (
            <AvatarImage
              src={`${import.meta.env.VITE_SERVER_URL}${selectedChatData.image}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`uppercase w-10 h-10 text-md flex items-center justify-center text-white rounded-full ${getColor(
                selectedChatData.selectedcolor
              )}`}
            >
              {selectedChatData.firstname
                ? selectedChatData.firstname.charAt(0)
                : selectedChatData.email.charAt(0)}
            </div>
          )}
        </Avatar>
        <span className="text-white text-lg font-medium">
          {selectedChatData.firstname
            ? `${selectedChatData.firstname} ${selectedChatData.lastname || ""}`
            : selectedChatData.email}
        </span>
      </div>

      <IoClose
        className="text-2xl text-neutral-400 hover:text-white cursor-pointer transition-all"
        onClick={closeChat}
      />
    </div>
  );
};

export default ChatHeader;
