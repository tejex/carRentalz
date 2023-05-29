import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";
dotenv.config(); 


const carSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    make:{
        type: String
    },
    model:{
        type: String
    },
    miles:{
        type:String
    },
    damages:{
        type:[String]
      },
})

export default carSchema;