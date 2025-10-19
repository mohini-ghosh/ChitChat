import { Router } from "express";
import { login, SignUp, getUserInfo, UpdateProfile, addProfileImage, removeProfileImage, logout} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import path from "path";


const authRoutes= Router();

// const upload= multer({ dest:"uploads/profiles/"});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const  upload = multer({ storage }); 

authRoutes.post("/SignUp", SignUp);
authRoutes.post("/login", login);
authRoutes.get('/user-info', verifyToken, getUserInfo);
authRoutes.post('/update-profile', verifyToken, UpdateProfile);
authRoutes.post('/add-profile-image', verifyToken, upload.single("profile-image"),addProfileImage);
authRoutes.delete('/remove-profile-image', verifyToken, removeProfileImage);
authRoutes.post('/logout', logout)

export default authRoutes;