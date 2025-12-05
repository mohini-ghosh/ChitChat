import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import contactsRoutes from "./routes/ContactRoutes.js"
import messagesRoutes from "./routes/MessagesRoutes.js" 
import setupSocket from "./socket.js"

 dotenv.config(); // with this all env variables will be available in process.env

const app=express();
const port= process.env.PORT ||3001;
const databaseURL= process.env.DATABASE_URL;

//cors is used to allow communication from different server.suppose our client is running on 5173 and server on 8747
app.use(cors({
    // origin: [process.env.ORIGIN],
     origin: process.env.ORIGIN,
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true,
    //for enable cookies we need credentials:true
}));


app.use(cookieParser());
app.use(express.json());
 app.use("/uploads/profiles", express.static("uploads/profiles")); //for static files like images


 app.use("/api/auth", authRoutes);
 app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes); 

const server= app.listen(port,()=>{
    // console.log(`Server is running at https://localhost:${port}`);
      console.log(`Server is running at http://localhost:${port}`);
});

//call the socket
 setupSocket(server);

mongoose.connect(databaseURL).then(()=>console.log("DB connection succesful")).catch((err)=>console.log(err.message));
