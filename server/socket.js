
// socket.js ata last
// import { Server as SocketIOServer } from "socket.io";
// import Message from "./models/MessagesModel.js";

// const setupSocket = (server) => {
//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: ["http://localhost:5173"],
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   const userSocketMap = new Map();

//   const disconnect = (socket) => {
//     console.log(`❌ Client disconnected: ${socket.id}`);
//     for (const [userId, sockId] of userSocketMap.entries()) {
//       if (sockId === socket.id) {
//         userSocketMap.delete(userId);
//         break;
//       }
//     }
//   };

//   const sendMessage = async (message) => {
//     try {
//       console.log("📥 Received sendMessage event:", message);
//       // const senderSocketId = userSocketMap.get(message.sender);
//       const recipientSocketId = userSocketMap.get(message.recipient);

//       // Save message to DB
//       const createdMessage = await Message.create(message);

//       const messageData = await Message.findById(createdMessage._id)
//         .populate("sender", "id email firstname lastname image color")
//         .populate("recipient", "id email firstname lastname image color");

//       if (recipientSocketId) {
//         io.to(recipientSocketId).emit("receiveMessage", messageData);
//       }

//       // if (senderSocketId) {
//       //   io.to(senderSocketId).emit("receiveMessage", messageData);
//       // }

//       console.log("✅ Message stored & emitted:", messageData._id);
//     } catch (err) {
//       console.error("❌ Error sending message:", err.message);
//     }
//   };

//   io.on("connection", (socket) => {
//     const userId = socket.handshake.query.userId;
//     console.log("🔌 A user connected:", socket.id);

//     if (userId) {
//       userSocketMap.set(userId, socket.id);
//       console.log(`User ${userId} mapped to socket ID: ${socket.id}`);
//     } else {
//       console.log("⚠️ No userId provided in connection query");
//     }

//     socket.on("sendMessage", sendMessage);
//     socket.on("disconnect", () => disconnect(socket));
//   });
// };

// export default setupSocket;


//atai last r porer ta user a mesg kor6e sender r k6e dubar dekh66e but recvr one time p66e also console a  dekha66e sending mesg guloke send mesg dekh66e na incoming

// import { Server as SocketIOServer } from "socket.io";
// import Message from "./models/MessagesModel.js";

// const setupSocket = (server) => {
//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: ["http://localhost:5173"],
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   const userSocketMap = new Map();

//   const disconnect = (socket) => {
//     console.log(`❌ Client disconnected: ${socket.id}`);
//     for (const [userId, sockId] of userSocketMap.entries()) {
//       if (sockId === socket.id) {
//         userSocketMap.delete(userId);
//         break;
//       }
//     }
//   };

//   const sendMessage = async (message) => {
//     try {
//       console.log("📥 Received sendMessage event:", message);

//       const senderSocketId = userSocketMap.get(message.sender);
//       const recipientSocketId = userSocketMap.get(message.recipient);

//       // Save message to DB
//       const createdMessage = await Message.create(message);
//       const messageData = await Message.findById(createdMessage._id)
//         .populate("sender", "id email firstname lastname image color")
//         .populate("recipient", "id email firstname lastname image color");

//       // ✅ Emit message to both sender and recipient sockets
//       if (recipientSocketId) {
//         io.to(recipientSocketId).emit("receiveMessage", messageData);
//       }
//       if (senderSocketId) {
//         io.to(senderSocketId).emit("receiveMessage", messageData);
//       }

//       console.log("✅ Message stored & emitted:", messageData._id);
//     } catch (err) {
//       console.error("❌ Error sending message:", err.message);
//     }
//   };

//   io.on("connection", (socket) => {
//     const userId = socket.handshake.query.userId;
//     console.log("🔌 A user connected:", socket.id);

//     if (userId) {
//       userSocketMap.set(userId, socket.id);
//       console.log(`User ${userId} mapped to socket ID: ${socket.id}`);
//     } else {
//       console.log("⚠️ No userId provided in connection query");
//     }

//     socket.on("sendMessage", sendMessage);
//     socket.on("disconnect", () => disconnect(socket));
//   });
// };

// export default setupSocket;

// oi dubar mesg incoming dekh66ilo sended mesg gulo ta thik korar jnno socket palte6i ja. bki ki6u na. sobete last r porer tai ache  
import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`❌ Client disconnected: ${socket.id}`);
    for (const [userId, sockId] of userSocketMap.entries()) {
      if (sockId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    try {
      console.log("📥 Received sendMessage event:", message);

      const senderSocketId = userSocketMap.get(message.sender);
      const recipientSocketId = userSocketMap.get(message.recipient);

      // Save message in DB
      const createdMessage = await Message.create(message);
      const messageData = await Message.findById(createdMessage._id)
        .populate("sender", "id email firstname lastname image color")
        .populate("recipient", "id email firstname lastname image color");

      // ✅ Send only to recipient, not to sender (sender already added locally)
      if (recipientSocketId && recipientSocketId !== senderSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", messageData);
      }

      // Optional: Send ack to sender so UI can replace optimistic message
      if (senderSocketId) {
        io.to(senderSocketId).emit("messageDelivered", messageData._id);
      }

      console.log("✅ Message stored & emitted:", messageData._id);
    } catch (err) {
      console.error("❌ Error sending message:", err.message);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("🔌 A user connected:", socket.id);

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} mapped to socket ID: ${socket.id}`);
    } else {
      console.log("⚠️ No userId provided in connection query");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;

// ishika r por sambhrm r bolar por socket socketcxt chatslice ja chng kore6ilm r ki6u na
// socket.jsx
// import { Server as SocketIOServer } from "socket.io";
// import Message from "./models/MessagesModel.js";

// const setupSocket = (server) => {
//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: ["http://localhost:5173"],
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//     pingInterval: 25000, // keepalive ping every 25s
//     pingTimeout: 60000,  // allow 60s before timing out
//   });

//   const userSocketMap = new Map();

//   const removeUserBySocket = (socketId) => {
//     for (const [userId, sockId] of userSocketMap.entries()) {
//       if (sockId === socketId) {
//         userSocketMap.delete(userId);
//         console.log(`🧹 Removed user ${userId} (socket ${socketId})`);
//         break;
//       }
//     }
//   };

//   io.on("connection", (socket) => {
//     const userId = socket.handshake.query.userId;
//     console.log(`🔌 Connected: ${socket.id} | User: ${userId || "Unknown"}`);

//     if (userId) {
//       userSocketMap.set(userId, socket.id);
//       console.log(`✅ Mapped user ${userId} → ${socket.id}`);
//     } else {
//       console.warn("⚠️ No userId in handshake query");
//     }

//     // --- Manual reconnect event ---
//     socket.on("userReconnect", (uid) => {
//       if (uid) {
//         userSocketMap.set(uid, socket.id);
//         console.log(`🔁 User ${uid} reconnected → ${socket.id}`);
//       }
//     });

//     // --- Send message ---
//     socket.on("sendMessage", async (message) => {
//       try {
//         console.log("📥 Received sendMessage event:", message);

//         if (!message.sender || !message.recipient) {
//           console.warn("⚠️ Missing sender or recipient, ignoring");
//           return;
//         }

//         const senderSocketId = userSocketMap.get(message.sender);
//         const recipientSocketId = userSocketMap.get(message.recipient);

//         // Save message to DB
//         const createdMessage = await Message.create(message);
//         const messageData = await Message.findById(createdMessage._id)
//           .populate("sender", "id email firstname lastname image color")
//           .populate("recipient", "id email firstname lastname image color");

//         // Emit to recipient
//         if (recipientSocketId && recipientSocketId !== senderSocketId) {
//           io.to(recipientSocketId).emit("receiveMessage", messageData);
//           console.log(`📨 Sent ${messageData._id} to recipient ${message.recipient}`);
//         }

//         // Confirm delivery to sender
//         if (senderSocketId) {
//           io.to(senderSocketId).emit("messageDelivered", messageData._id);
//         }

//       } catch (err) {
//         console.error("❌ Error sending message:", err);
//       }
//     });

//     // --- Disconnect cleanup ---
//     socket.on("disconnect", (reason) => {
//       console.log(`⚡ Disconnected: ${socket.id} | Reason: ${reason}`);
//       removeUserBySocket(socket.id);
//     });
//   });

//   console.log("🚀 Socket.IO server initialized successfully");
// };

// export default setupSocket;
