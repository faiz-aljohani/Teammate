const http  =  require('http');
const express = require('express')
const router = express.Router()

const { error } = require('console');
const database = require("../db");
const User = require("../models/User");

// database.connect();
loginRouter = router;
let loginForm ; 

//----------------------------------Client Req.
router.get('/', (req,res)=>{
    console.log('GET req. in login route')
    console.log("is active: " + isSessionActive(req))

})

router.post('/logging', async (req,res)=>{

    console.log('>> req. for login a user')
    console.log("is active: " + isSessionActive(req))

    // let email = req.params.email 

    loginForm = req.body;
    
    //valid input NOW create newUser in DB
    try{

      //To connect
      await database.connect();

      const userID = await loginUser(loginForm);
      
      if(!isSessionActive(req)){
        await createSession(req,res,userID);
      }

      console.log(">>login success")
      res.redirect("/")
      }

    catch (e){
      console.log("error at login route POST /logging: ");
      console.log(e)


      res.render("login",{err:"Email or Password is Incorrect."})
    }    
    finally{
      // To disconnect
      // database.disconnect();
    }
})

//----------------------------------------Func.

const loginUser = async (loginForm)=>{
  
  const email = loginForm['email'];
  const pwd = loginForm["password"]

  // try to create new user
  const loggingUser = await User.where("email").equals(email).where('pwd').equals(pwd)

  if(loggingUser.length == 0) throw new Error("email OR passward is not correct")
  
  //log the result----------
  // console.log(loggingUser)
  //------------------------

  const userID  = loggingUser[0]['_id'].toString();
  return userID;

}

const createSession = async (req,res,userID)=>{

  console.log('>> start createSession()')
  
  //log s/ vars----------------
  // const reqUserID  = await req.session.userID;
  // const UserID = userID;
  // console.log(reqUserID)
   //  ^ if the session still active this will have the userID if not it will be undifend 
  //  console.log(UserID)
  // console.log(req)
  //-------------------------

  req.session.userID = userID
  req.session.save();


  //-------------------------
  //to log the result V
  // console.log(req.session.userID)
  // >> { userID: '645423108f811aee90ecf429' }
  //-------------------------
}
isSessionActive = (req)=>{
  return typeof req.session.userID === "string";
}
module.exports = {
  loginRouter,
  createSession,
  isSessionActive,
};
