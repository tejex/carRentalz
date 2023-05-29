import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
/****************************************************************/
import bodyParser from 'body-parser';
import session from "express-session";
import passport from "passport";
/****************************************************************/
import connectToDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import mainRouter from './routes/mainRoutes.js'
/****************************************************************/
import cors from 'cors';
const corsOptions = ({
  origin:'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionSuccessStatus:200
});
app.use(cors(corsOptions));
/****************************************************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
/****************************************************************/
const pass = encodeURIComponent(process.env.MONGO_PASS);
const uri = `mongodb+srv://bamMongo23:${pass}@cluster0.wvbvubq.mongodb.net/carRentalz`;
/****************************************************************/
app.use(session({
  secret:"my little secret dont tell bro", 
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
/****************************************************************/
app.get("/", (req,res)=>{
  res.redirect("https://localhost:3000");
})
/****************************************************************/
//All routes related to authentication will come through here.
app.use("/auth",authRouter); 
app.use("/main",mainRouter);
/****************************************************************/
const start = async () => {
  try {
    connectToDB(uri);
    app.listen(5001, () => {
      console.log(`Server is listening on port 5001`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
/****************************************************************/







