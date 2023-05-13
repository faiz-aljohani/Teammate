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
router.get('/', async (req,res)=>{
    console.log('GET req. in login route')
    console.log("is active: " + isSessionActive(req))


    if(isSessionActive(req)){
      res.redirect("/")
    }else{
      res.render("login",{error:"",info:""})
    }

    // res.send({t:"ok"})

})

router.post('/logging', async (req,res)=>{
    console.log('>> req. for login a user')
    // console.log("is active: " + isSessionActive(req))

    // let email = req.params.email 

    loginForm = req.body;
    
    //valid input NOW create newUser in DB
  try{

    //To connect
    await database.connect();

    const userID = await loginUser(loginForm);
    
    // console.log("is active: " + isSessionActive(req))

    if(!isSessionActive(req)){
      await createSession(req,res,userID);
    }

    res.redirect("/")
    
    // console.log("is active: " + isSessionActive(req))
    console.log(">>login success")
    }

    catch (e){
      console.log("error at login route POST /logging: ");
      console.log(e)


      res.render("login",{error:"Email or Password is Incorrect.",info:""})
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

  const loggingUser = await User.findOne({ email: email })
  
  // console.log(loggingUser.length == 0)
  let validPwd = await loggingUser.validatePassword(pwd)

  if( !validPwd || loggingUser.length == 0) throw new Error("email OR passward is not correct")

  const userID  = loggingUser['_id'].toString();
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

  //------------------------------------

  req.session.userID = userID
  req.session.save();

  //------------------------------------
  //to log the result V
  // console.log(req.session.userID)
  // >> { userID: '645423108f811aee90ecf429' }
  //------------------------------------
}
isSessionActive = (req)=>{
  //bcz express-session give you a plane cookie after you delete the cookie in logout 
  // I diff. between our cookie and plane cookie  by userID
  // console.log("session:")
  // console.log(req.session)
  return req.session !== undefined && req.session.userID !== undefined ;
}
module.exports = {
  loginRouter,
  createSession,
  isSessionActive,
};
