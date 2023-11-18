import User  from '../models/User.js';
import Owner  from '../models/Owners.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
dotenv.config();
//*****************************************************************************/
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from 'passport';
//*****************************************************************************/
const saltRounds = :);
const sPhrase =  :);
//*****************************************************************************/
const createToken = (_id) =>{

  let payload = {"id": _id}
  const token = jwt.sign(payload,process.env.JWT_SECRET,{noTimestamp:true,expiresIn:'1d'});
  const decodedToken = jwt.decode(token, { complete: true });
  const expiresAt = decodedToken.payload.exp * 1000; // Convert expiration time to milliseconds

  return {
    token: token,
    expiresAt: expiresAt,
    _id:_id
  };

}
//*****************************************************************************/
const login = async (req,res) =>{
  const {username,password, admin} = req.body;
  if(admin==null){
    try{
      const user = ({
        username:username,
        password:password,
        type:"User"
      })
    await User.findOne({username:username}).then((foundUser)=>{
      bcrypt.compare(password, foundUser.password,function(err, result){
        if(result){
          const token = createToken(foundUser._id);
          res.status(200).json({user, token});
        }
        else{
          console.log(err);
        }
      })
    })
    }catch(err){
      res.send({status:400});
    }
  }
  else{
    try{
      const user = ({ // naming this user instead of owner because the frontend recognizes the object being received
        //with the name user, instead of owner. this is still owner but will just name it user.
        username:username,
        password:password,
        type:"Owner"
      })
      await Owner.findOne({username:username}).then((foundOwner)=>{
      if(admin==sPhrase){
        bcrypt.compare(password, foundOwner.password,function(err, result){
          if(result){
            const token = createToken(foundOwner._id);
            res.status(200).json({user, token});
          }
        })
      }
      else{
        throw new Error("Not correct Mcode")
      }
    }).catch((err) =>{
      res.send(err);
    })
  }catch(err){
    res.send(err);
  }
  }
}
//*****************************************************************************/
const sign_up = async(req,res) => {
    const {name, username,password, admin} = req.body;
    if(admin==null){
      try{
      bcrypt.hash(password, saltRounds, function(err, hash){
        const newUser =  new User({
            name: name,
            username: username,
            password: hash,
            rentedCars: {}
        })
        newUser.save();
        const token = createToken(newUser._id);
        res.status(200).json({newUser,token});
    })
    }catch(err){
      res.status(400);
      }
    }
    else{
      try{
        if(admin == sPhrase){
          bcrypt.hash(req.body.password, saltRounds, function(err, hash){
            const newManager =  new Owner({
              name: name,
              username: username,
              password: hash,
          }) 
          newManager.save()
          const token = createToken(newManager._id);
          res.status(200).json({token,newManager});
        })
      }
      else{
        res.send("Not Correct Manager Code")
      }
      }catch(err){
        res.status(400);
    }
  }
}
//*****************************************************************************/
passport.use(User.createStrategy());
passport.serializeUser(function(user,done){
    done(null,user.id)
  });
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(err,user){
      done(err,user);
    });
});
//*****************************************************************************/
//this is the google stuff, its broken so will fix after the regular sign-in and signup is fixed.
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  async function(accessToken, refreshToken, profile, done){
    try{

        let user = await User.findOne({googleId:profile.id});
        if(user){
          console.log("User found");
          console.log(accessToken)
          return done(null, user);
        }
        else{
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id
          });
          user = await newUser.save();
          return done(null, user);
        }   
    }catch (err){
      return done(err);
    }
  }
));
//*****************************************************************************/
export {login, sign_up};
//*****************************************************************************/
