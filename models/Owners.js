import mongoose from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
import passport from "passport";

const ownerSchema = new mongoose.Schema({
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
    requests:{
        type:[Object]
    },
    workLoad:{
    type:Number
    },
    role: { 
        type: String, 
        default: 'Owner' 
    }
})

ownerSchema.plugin(passportLocalMongoose);
ownerSchema.plugin(findOrCreate);

const Owner = new mongoose.model("Owner",ownerSchema);
passport.use(Owner.createStrategy());
passport.serializeUser(function(owner,done){
    done(null,owner.id)
  });
  passport.deserializeUser(function(id,done){
    Owner.findById(id).then(function(err,owner){
      done(err,owner);
    });
});

export default Owner;
