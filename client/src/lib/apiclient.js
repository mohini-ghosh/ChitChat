 // wrapper for axios

// const apiClient= axios.create({
//    baseURL: HOST,
//    headers: {
//        "Content-Type": "application/json",
//    },
   
// })

// src/lib/apiClient.js

import axios from "axios";
import { HOST } from "@/utils/constants";

export const apiClient = axios.create({
  baseURL: HOST,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


 
