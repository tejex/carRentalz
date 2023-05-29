import dotenv from 'dotenv';
dotenv.config(); 
import mongoose from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
//*****************************************************************************/
const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type:String
    },
    googleId:{
      type:String
    },
    role: { 
        type: String, 
        default: 'User' 
    },
    requests:{
        type: [],
    },
})
//*****************************************************************************/
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User",userSchema);
//*****************************************************************************/



export default User;
