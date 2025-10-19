// import { create } from 'zustand';
// import { createAuthSlice } from './slices/auth-slice';

// //we can call anywhere in project get ,set method by useappstore
// // export const useAppStore = create()((...a)=> ({
// //   ...createAuthSlice(...a),
// // }));

// //gpt 
// export const useAppStore = create((set) => ({
//   userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
//   setUserInfo: (user) => {
//     localStorage.setItem("userInfo", JSON.stringify(user));
//     set({ userInfo: user });
//   },
//   clearUserInfo: () => {
//     localStorage.removeItem("userInfo");
//     set({ userInfo: null });
//   },

//    selectedChat: null,

//   setSelectedChat: (chat) => set({ selectedChat: chat }),

//   clearSelectedChat: () => set({ selectedChat: null }),
// }));



///gpt r oi logout clk r por auth pg as6ilona bole
import { create } from "zustand";
import { createChatSlice } from "./slices/chat-slice";

function safeParse(item) {
  try {
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.warn("Invalid userInfo in localStorage, resetting:", e);
    localStorage.removeItem("userInfo");
    return null;
  }
}

export const useAppStore = create((set,get) => ({
userInfo: safeParse(localStorage.getItem("userInfo")),
  
  setUserInfo: (user) => {
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      localStorage.removeItem("userInfo");
    }
    set({ userInfo: user });
  },

  clearUserInfo: () => {
    localStorage.removeItem("userInfo");
    set({ userInfo: null });
  },
 //swapnil r lekha 6ilona
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  clearSelectedChat: () => set({ selectedChat: null }),

  ...createChatSlice(set, get),

}));
