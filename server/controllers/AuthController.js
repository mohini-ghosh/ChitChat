import { request, response } from "express";
import User from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import { compare } from "bcrypt";
import { renameSync, unlinkSync } from "fs";



const maxAge= 3*24*60*60*1000;
 
const createtoken =(email,userId) =>{
    // return jwt.sign({email,password}, process.env.JWT_KEY,{expiresIn:maxAge});
    // return jwt.sign({ email, id: userId }, process.env.JWT_KEY, { expiresIn: maxAge });
    return jwt.sign({ email, id: userId.toString() }, process.env.JWT_KEY, { expiresIn: maxAge });

}


// whenever sign up what will happen written here
export const SignUp= async (request, response, next)=>{
    try{
        const {email,password} =request.body;
        if(!email || !password) return response.status(400).send("Email and Password is required");
    
    const user= await User.create({email,password});
    // sending jwt token for verification
    response.cookie("jwt", createtoken(email,user.id),{
        maxAge: maxAge ,
        // secure:true,
        secure:process.env.NODE_ENV === "production",//gpt
        sameSite:"None",
        httpOnly: true,
    });

    return response.status(201).json({user:{
        id:user.id,
        email:user.email,
        profileSetup: user.profileSetup,
    }})
    }
    catch(error){
        console.error({error});
        return response.status(500).send("Internal Server Error");
    }
}



export const login= async (request, response, next)=>{
    try{
        const {email,password} =request.body;
        if(!email || !password) return response.status(400).send("Email and Password is required");

    const user= await User.findOne({email});
    if(!user) return response.status(401).send("User with given email is not found");

    // const isMatch= await compare(password,user.password);
    // if(!isMatch) return response.status(401).send("Invalid Email or Password");

    const auth= await compare(password, user.password);
    if(!auth) return response.status(401).send("Password is incorrect");
    // sending jwt token for verification
    response.cookie("jwt", createtoken(email,user.id),{
        maxAge,
        secure:true,
        // secure: false,
        sameSite:"None",
         httpOnly: true,
    });
    return response.status(200).json({user:{
        id:user.id,
        email:user.email,
        profileSetup: user.profileSetup,
        firstName:user.firstname,
        lastName:user.lastname,
        image:user.image,
        color:user.color,
    }})
    }
    catch(error){
        console.error({error});
        return response.status(500).send("Internal Server Error");
    }
}



export const getUserInfo= async (request, response, next)=>{
    try{
        const userData=  await User.findById(request.userId);
        if(!userData) return response.status(404).send("User with given id not found");

    return response.status(200).json({
        id:userData.id,
        email:userData.email,
        profileSetup: userData.profileSetup,
        firstName:userData.firstname,
        lastName:userData.lastname,
        image:userData.image,
        color:userData.color,
    })
    }
    catch(error){
        console.error({error});
        return response.status(500).send("Internal Server Error");
    }
}

export const UpdateProfile= async (request, response, next)=>{
    try{
        const {userId}= request;
        const {firstname, lastname, color}= request.body;
        if(!firstname || !lastname || color===undefined) return response.status(400).send("Firstname lastname color is required");

        const userData= await User.findByIdAndUpdate(
            userId,{
            firstname,
            lastname,
            color,
            profileSetup:true,},
            {new:true, runValidators:true}
        );
        //gpt
        if (!userData) {  
             return response.status(404).send("User not found");
      }
        return response.status(200).json({
            id:userData.id,
            email:userData.email,
            profileSetup: userData.profileSetup,
            firstname:userData.firstname,
            lastname:userData.lastname,
            image:userData.image,
            color:userData.color,
        })
    }
    catch(error){
        console.error({error});
        return response.status(500).send("Internal Server Error");
    }
}

export const addProfileImage= async (request, response, next)=>{
    try{
        if(!request.file) return response.status(400).send("Profile image is required");

        // const date= Date.now();
        // let fileName= "uploads/profiles/" + date + request.file.originalname;
        // renameSync(request.file.path, fileName);
        //  const fileName = request.file.path; 
         const filePath = `/uploads/profiles/${request.file.filename}`;
        const updatedUser = await User.findByIdAndUpdate(request.userId, {image: filePath}, {new:true, runValidators:true});

        return response.status(200).json({
           image: updatedUser.image,
        })
    }
    catch(error){
        console.error({error});
        return response.status(500).send("Internal Server Error");
    }
}

// export const removeProfileImage= async (request, response, next)=>{
//     try{
//         const {userId}= request;
//         const {firstname, lastname, color}= request.body;
//         if(!firstname || !lastname || color===undefined) return response.status(400).send("Firstname lastname color is required");

//         const userData= await User.findByIdAndUpdate(
//             userId,{
//             firstname,
//             lastname,
//             color,
//             profileSetup:true,},
//             {new:true, runValidators:true}
//         );
//         //gpt
//         if (!userData) {  
//              return response.status(404).send("User not found");
//       }
//         return response.status(200).json({
//             id:userData.id,
//             email:userData.email,
//             profileSetup: userData.profileSetup,
//             firstname:userData.firstname,
//             lastname:userData.lastname,
//             image:userData.image,
//             color:userData.color,
//         })
//     }
//     catch(error){
//         console.error({error});
//         return response.status(500).send("Internal Server Error");
//     }
// }

//gpt thke puro removeprofileimg niye6i
export const removeProfileImage = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profileImage) {
      try {
        unlinkSync(user.profileImage);  // delete from disk
      } catch (err) {
        console.error("File delete error:", err.message);
      }
    }

    user.profileImage = null;
    await user.save();

    res.status(200).json({ message: "Profile image removed" });
  } catch (error) {
    console.error("Server error in removeProfileImage:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//till 5:57
// export const logout = async (req, res) => {
//   try {
//     res.cookie("jwt", "", {maxAge:1, secure:true, sameSite:"none"})
//     res.status(200).json({ message: "Logout succesfull" });
//   } catch (error) {
//     console.error("Server error in removeProfileImage:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

//mesg controller r route add kore http r jnno log out ho6ilo na tai ata gpt thke
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",      // ✅ "none" only for HTTPS, use "lax" locally
      secure: true,         // ✅ must be false on localhost
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


