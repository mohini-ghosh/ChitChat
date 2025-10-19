// import { useAppStore } from "@/store";
// import { HOST } from "@/utils/constants";
// import { createContext, useContext, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocket = () => {
//     return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//     const socket = useRef();
//     const {userInfo} =useAppStore();

//     useEffect(() => {
//         if (userInfo) {
//             // Initialize socket connection with userId as query parameter
//             socket.current = io(HOST,{
//                 query: { userId: userInfo.id },
//                 withCredentials: true,
//             });

//             socket.current.on("connect", () => {
//                 console.log("Connected to socket server with ID:", socket.current.id);
//             });
            
//             const handleReceiveMessage =(message) =>{
//                const {selectedChatData, selectedChatType, addMessage} =useAppStore.getState();
//                if(selectedChatType !==undefined && (selectedChatData._id=== message.sender._id || selectedChatData._id=== message.recipient._id)
//                ){
//                 console.log("Message received:", message);
//                 addMessage(message);
//               }
//             }
//             socket. current.on("Message received", handleReceiveMessage);


//             return ()=>{
//                 socket.current.disconnect();
//             };
//         }
//     }, [userInfo]);

//     return (
//         <SocketContext.Provider value={socket.current}>
//             {children}
//         </SocketContext.Provider>
//     );
// };


// SocketContext.jsx
//best till 5 hr 29 min 
// import { useAppStore } from "@/store";
// import { HOST } from "@/utils/constants";
// import { createContext, useContext, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//   const socket = useRef();
//   const { userInfo } = useAppStore();

//   useEffect(() => {
//     if (!userInfo) return;

//     socket.current = io(HOST, {
//       query: { userId: userInfo.id },
//       withCredentials: true,
//     });

//     socket.current.on("connect", () => {
//       console.log("Connected to socket server:", socket.current.id);
//     });

//     const handleReceiveMessage = (message) => {
//       console.log("Incoming message from server:", message);

//       const { selectedChatData, selectedChatType, addMessage } =
//         useAppStore.getState();

//       if (
//         selectedChatType !== undefined &&
//         selectedChatData &&
//         (selectedChatData._id === message.sender?._id ||
//           selectedChatData._id === message.recipient?._id)
//       ) {
//         console.log("Message belongs to current chat:", message);
//         addMessage(message);
//       } else {
//         console.log(
//           "Message not added (different chat or no chat selected)"
//         );
//       }
//     };

//     socket.current.on("receiveMessage", handleReceiveMessage);

//     return () => {
//       socket.current.disconnect();
//     };
//   }, [userInfo]);

//   return (
//     <SocketContext.Provider value={socket.current}>
//       {children}
//     </SocketContext.Provider>
//   );
// };


// socketcontext.js ata last
// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { HOST } from "@/utils/constants";
// import { useAppStore } from "@/store";

// const SocketContext = createContext(null);
// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const { userInfo, addMessage } = useAppStore();

//   useEffect(() => {
//     if (!userInfo) return;

//     const newSocket = io(HOST, { query: { userId: userInfo.id }, withCredentials: true });
//     setSocket(newSocket);

//     newSocket.on("connect", () => console.log("✅ Connected to socket:", newSocket.id));

//     newSocket.on("receiveMessage", (msg) => {
//       console.log("📩 Incoming message:", msg);
//       addMessage(msg);
//     });

//     return () => newSocket.disconnect();
//   }, [userInfo, addMessage]);

//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };


//atai last r porer ta user a mesg kor6e sender r k6e dubar dekh66e but recvr one time p66e also console a  dekha66e sending mesg guloke send mesg dekh66e na incoming

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { HOST } from "@/utils/constants";
import { useAppStore } from "@/store";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo, addMessage } = useAppStore();

  useEffect(() => {
    if (!userInfo) return;

    const newSocket = io(HOST, {
      query: { userId: userInfo._id || userInfo.id },
      withCredentials: true,
      
    });

    setSocket(newSocket);

    newSocket.on("connect", () => console.log("✅ Connected:", newSocket.id));
    newSocket.on("receiveMessage", (msg) => {
      console.log("📩 Incoming message:", msg);
      addMessage(msg);
    });

    return () => newSocket.disconnect();
  }, [userInfo, addMessage]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

// ishika r por sambhrm r bolar por socket socketcxt chatslice ja chng kore6ilm r ki6u na (labh hoini jodio)
// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { HOST } from "@/utils/constants";
// import { useAppStore } from "@/store";

// const SocketContext = createContext(null);
// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const { userInfo, addMessage } = useAppStore();

//   useEffect(() => {
//     if (!userInfo?._id && !userInfo?.id) return;

//     const userId = userInfo._id || userInfo.id;

//     const newSocket = io(HOST, {
//       autoConnect: false,
//       transports: ["websocket"],
//       withCredentials: true,
//       query: { userId },
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 3000,
//     });

//     // --- Connection Handling ---
//     newSocket.connect();

//     newSocket.on("connect", () => {
//       console.log(`✅ Connected: ${newSocket.id} (User: ${userId})`);
//       newSocket.emit("userReconnect", userId); // Tell backend to remap
//     });

//     newSocket.on("reconnect", (attempt) => {
//       console.log(`🔁 Reconnected after ${attempt} attempts`);
//       newSocket.emit("userReconnect", userId);
//     });

//     newSocket.on("connect_error", (err) => {
//       console.error("❌ Socket connection error:", err.message);
//     });

//     newSocket.on("disconnect", (reason) => {
//       console.warn("⚠️ Socket disconnected:", reason);
//     });

//     // --- Message Events ---
//     newSocket.on("receiveMessage", (msg) => {
//       console.log("📩 Incoming message:", msg);
//       addMessage(msg);
//     });

//     newSocket.on("messageDelivered", (messageId) => {
//       console.log("📬 Message delivered:", messageId);
//     });

//     setSocket(newSocket);

//     // --- Cleanup ---
//     return () => {
//       console.log("🧹 Cleaning up socket...");
//       newSocket.disconnect();
//     };
//   }, [userInfo?._id, userInfo?.id, addMessage]);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
