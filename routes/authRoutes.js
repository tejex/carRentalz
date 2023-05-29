import express from 'express';
import passport from 'passport';
import {login, sign_up} from '../controllers/authController.js'
const router = express.Router();
//*****************************************************************/
router.route("/login").post(login);
router.route("/signup").post(sign_up);
//*****************************************************************/
router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(!err){
            res.send({status:200});
        }
    })
})
//*****************************************************************/
router.get("/google",passport.authenticate('google', {
    scope: ['profile', 'email']
  }))
//*****************************************************************/
router.get("/google/callback",passport.authenticate("google",
  { successRedirect:"http://localhost:3000/main",
  failureRedirect: "http://localhost:3000/auth/login"
}), (req, res) => {
  console.log("made it here")
  res.send({ token: req.user.token }); // send token back to client
});
//*****************************************************************/
export default router; 

