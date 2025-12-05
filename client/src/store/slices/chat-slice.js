// export const createChatSlice = (set, get) =>({
//     selectedChatType:undefined,
//     selectedChatData:undefined,
//     selectedChatMessages: [],
//     setSelectChatType:(selectedChatType) =>set({selectedChatType}),
//     setSelectChatData:(selectedChatData) =>set({selectedChatData}),
//     setSelectChatMessages:(selectedChatMessages) =>set({selectedChatMessages}),
//     closeChat: ()=>
//         set({
//             selectedChatType:undefined,
//             selectedChatData:undefined,
//             selectedChatMessages: [],
//         }),
//         addMessage: (message)=>{
//             const selectedChatMessages =get().selectedChatMessages;
//             const selectedChatType =get().selectedChatType;

//            set({
//             selectedChatMessages: [
//                 ...selectedChatMessages,
//                 {
//                     ...message,
//                     recipient:
//                     selectedChatType ==="channel"  //here we can see who message from channe;
//                     ?message.recipient
//                     :message.recipient._id,

//                     sender:
//                     selectedChatType ==="channel"  //here we can see who message from channe;
//                     ?message.sender
//                     :message.sender._id,
//                 },
//             ],
//         });
//         },
// });


// chat-slice.js correct for right alignment of sender mesg
// export const createChatSlice = (set, get) => ({
//   selectedChatType: null,
//   selectedChatData: null,
//   selectedChatMessages: [],

//   setSelectChatType: (selectedChatType) => set({ selectedChatType }),
//   setSelectChatData: (selectedChatData) => set({ selectedChatData }),
//   setSelectChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),

//   closeChat: () =>
//     set({
//       selectedChatType: null,
//       selectedChatData: null,
//       selectedChatMessages: [],
//     }),

//   addMessage: (message) => {
//     const messages = get().selectedChatMessages;
//     const localId = message.localId || `${Date.now()}-${Math.random()}`;
//     // ✅ Prevent duplicates by checking unique id
//     const exists = messages.some(
//       (m) => m._id === message._id || m.localId === message.localId
//     );
//     if (exists) return;

//     const selectedChatType = get().selectedChatType;

//     set({
//       selectedChatMessages: [
//         // ...selectedChatMessages,
//           ...messages, 
//         {
//           ...message,
//             localId,
//           recipient:
//             selectedChatType === "channel"
//               ? message.recipient
//               : message.recipient?._id,
//           sender:
//             selectedChatType === "channel"
//               ? message.sender
//               : message.sender?._id,
//         },
//       ],
//     });
//   },
// });

// chat-slice.js
// export const createChatSlice = (set, get) => ({
//   selectedChatType: null,
//   selectedChatData: null,
//   selectedChatMessages: [],

//   setSelectChatType: (selectedChatType) => set({ selectedChatType }),
//   setSelectChatData: (selectedChatData) => set({ selectedChatData }),
//   setSelectChatMessages: (selectedChatMessages) =>
//     set({ selectedChatMessages }),

//   closeChat: () =>
//     set({
//       selectedChatType: null,
//       selectedChatData: null,
//       selectedChatMessages: [],
//     }),

//   addMessage: (message) => {
//     const messages = get().selectedChatMessages;
//     const localId = message.localId || `${Date.now()}-${Math.random()}`;

//     // Normalize ids (always string)
//     const normalizeId = (val) =>
//       val && typeof val === "object" ? val._id : val;

//     const sender = normalizeId(message.sender);
//     const recipient = normalizeId(message.recipient);

//     // 🔹 Replace optimistic message with server-confirmed (_id comes later)
//     let updated = false;
//     const updatedMessages = messages.map((m) => {
//       if (message._id && m.localId === message.localId) {
//         updated = true;
//         return { ...m, ...message, sender, recipient };
//       }
//       return m;
//     });

//     if (updated) {
//       set({ selectedChatMessages: updatedMessages });
//       return;
//     }

//     // 🔹 Prevent duplicates
//     const exists = messages.some(
//       (m) =>
//         (m._id && message._id && m._id === message._id) ||
//         (m.localId && message.localId && m.localId === message.localId)
//     );
//     if (exists) return;

//     // 🔹 Add new message
//     set({
//       selectedChatMessages: [
//         ...messages,
//         { ...message, localId, sender, recipient },
//       ],
//     });
//   },
// });

// chat-slice.js  ata last
// export const createChatSlice = (set, get) => ({
//   selectedChatType: null,
//   selectedChatData: null,
//   selectedChatMessages: [],

//   setSelectChatType: (selectedChatType) => set({ selectedChatType }),
//   setSelectChatData: (selectedChatData) => set({ selectedChatData }),
//   setSelectChatMessages: (selectedChatMessages) =>
//     set({ selectedChatMessages }),

//   closeChat: () =>
//     set({
//       selectedChatType: null,
//       selectedChatData: null,
//       selectedChatMessages: [],
//     }),

//   addMessage: (message) => {
//     const messages = get().selectedChatMessages;
//     const localId = message.localId || `${Date.now()}-${Math.random()}`;

//     // Normalize ids (always string)
//     const normalizeId = (val) =>
//       val && typeof val === "object" ? val._id : val;

//     const sender = normalizeId(message.sender);
//     const recipient = normalizeId(message.recipient);

//     // 🔹 Replace optimistic with server-confirmed
//     let updated = false;
//     const updatedMessages = messages.map((m) => {
//       if (message._id && m.localId && m.localId === message.localId) {
//         updated = true;
//         return { ...m, ...message, sender, recipient };
//       }
//       return m;
//     });

//     if (updated) {
//       set({ selectedChatMessages: updatedMessages });
//       return;
//     }

//     // 🔹 Prevent duplicates
//     const exists = messages.some(
//       (m) =>
//         (m._id && message._id && m._id === message._id) ||
//         (m.localId && message.localId && m.localId === message.localId)
//     );
//     if (exists) return;

//     // 🔹 Add new message
//     set({
//       selectedChatMessages: [
//         ...messages,
//         { ...message, localId, sender, recipient },
//       ],
//     });
//   },
// });

//atai last r porer ta user "a" mesg kor6e sender r k6e dubar dekh66e but recvr one time p66e also console a  dekha66e sending mesg guloke send mesg dekh66e na incoming
//thik ache 6hr tai 2 nov e ate safe rekhe6i

// export const createChatSlice = (set, get) => ({
//   selectedChatType: null,
//   selectedChatData: null,
//   selectedChatMessages: [],
//   setSelectChatType: (selectedChatType) => set({ selectedChatType }),
//   setSelectChatData: (selectedChatData) => set({ selectedChatData }),
//   setSelectChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
 
//   closeChat: () =>
//     set({
//       selectedChatType: null,
//       selectedChatData: null,
//       selectedChatMessages: [],
//     }),

//   addMessage: (message) => {
//     const messages = get().selectedChatMessages;
//     const localId = message.localId || `${Date.now()}-${Math.random()}`;

//     // Normalize
//     const normalizeId = (val) => (val && typeof val === "object" ? val._id : val);
//     const sender = normalizeId(message.sender);
//     const recipient = normalizeId(message.recipient);

//     // Replace optimistic message with confirmed one
//     let updated = false;
//     const updatedMessages = messages.map((m) => {
//       if (message._id && m.localId && m.localId === message.localId) {
//         updated = true;
//         return { ...m, ...message, sender, recipient };
//       }
//       return m;
//     });

//     if (updated) {
//       set({ selectedChatMessages: updatedMessages });
//       return;
//     }

//     // Prevent duplicates
//     const exists = messages.some(
//       (m) =>
//         (m._id && message._id && m._id === message._id) ||
//         (m.localId && message.localId && m.localId === message.localId)
//     );
//     if (exists) return;

//     // Add new message
//     set({
//       selectedChatMessages: [
//         ...messages,
//         { ...message, localId, sender, recipient },
//       ],
//     });
//   },
// });


//10 ta obdhi atai 6ilo
// export const createChatSlice = (set, get) => ({
//   selectedChatType: null,
//   selectedChatData: null,
//   selectedChatMessages: [],
//   directMessagesContacts: [],

//   setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
//   setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
//   setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
//   setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }),

//   closeChat: () =>
//     set({
//       selectedChatType: null,
//       selectedChatData: null,
//       selectedChatMessages: [],
//     }),

//   addMessage: (message) => {
//     const messages = get().selectedChatMessages;
//     const localId = message.localId || `${Date.now()}-${Math.random()}`;

//     // Normalize sender and recipient
//     const normalizeId = (val) => (val && typeof val === "object" ? val._id : val);
//     const sender = normalizeId(message.sender);
//     const recipient = normalizeId(message.recipient);

//     // Replace optimistic message with confirmed one
//     let updated = false;
//     const updatedMessages = messages.map((m) => {
//       if (message._id && m.localId && m.localId === message.localId) {
//         updated = true;
//         return { ...m, ...message, sender, recipient };
//       }
//       return m;
//     });

//     if (updated) {
//       set({ selectedChatMessages: updatedMessages });
//       return;
//     }

//     // Prevent duplicates
//     const exists = messages.some(
//       (m) =>
//         (m._id && message._id && m._id === message._id) ||
//         (m.localId && message.localId && m.localId === message.localId)
//     );
//     if (exists) return;

//     // Add new message
//     set({
//       selectedChatMessages: [
//         ...messages,
//         { ...message, localId, sender, recipient },
//       ],
//     });
//   },
// });

//github
export const createChatSlice = (set, get) => ({
  selectedChatType: null,
  selectedChatData: null,
  selectedChatMessages: [],

  setSelectChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),

  closeChat: () =>
    set({
      selectedChatType: null,
      selectedChatData: null,
      selectedChatMessages: [],
    }),

  addMessage: (message) => {
    const messages = get().selectedChatMessages;
    const localId = message.localId || `${Date.now()}-${Math.random()}`;

    // Normalize
    const normalizeId = (val) => (val && typeof val === "object" ? val._id : val);
    const sender = normalizeId(message.sender);
    const recipient = normalizeId(message.recipient);

    // Replace optimistic message with confirmed one
    let updated = false;
    const updatedMessages = messages.map((m) => {
      if (message._id && m.localId && m.localId === message.localId) {
        updated = true;
        return { ...m, ...message, sender, recipient };
      }
      return m;
    });

    if (updated) {
      set({ selectedChatMessages: updatedMessages });
      return;
    }

    // Prevent duplicates
    const exists = messages.some(
      (m) =>
        (m._id && message._id && m._id === message._id) ||
        (m.localId && message.localId && m.localId === message.localId)
    );
    if (exists) return;

    // Add new message
    set({
      selectedChatMessages: [
        ...messages,
        { ...message, localId, sender, recipient },
      ],
    });
  },
});

