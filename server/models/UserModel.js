import mongoose, { Types } from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required"],
        unique:true,
    },

    password:{
        type: String,
        required: [true, "Password is required"],
    },

    firstname:{
        type: String,
        required: false,
    },

    lastname:{
        type: String,
        required: false,
    },

    image:{
        type: String,
        required: false,
    },

    color:{
        type: Number,
        required: false,
    },

    profileSetup:{  //small s 6ilo gpt S bollo karon profile updation ho66ilo na 2:38:51
        type: Boolean,
        default: false,
    },
    // first need to set up profile after login then only access chat page
});

// before saving the data encrypt the password so we need to run this fn
userSchema.pre("save", async function (next) {
  if (this.isModified('password')) {
    const salt= await genSalt();
    this.password= await hash(this.password, salt);
  }
    next();
})

// model is created
const User=mongoose.model("Users",userSchema);
export default User;