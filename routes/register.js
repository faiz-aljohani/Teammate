const http  =  require('http');
const express = require('express')
const router = express.Router()
const { error } = require('console');
const {createSession,isSessionActive} = require('./login.js')

// const {createSession,isSessionActive} = require('./login')
// const isSessionActive = require('./login')

const database = require("../db");
const User = require("../models/User");


module.exports = router;
let registerForm ; 


//----------------------------------Client Req.
router.get('/', (req,res)=>{
    console.log('GET req. in register route')
    res.render("register",{err:''})
})

router.post('/new', async (req,res)=>{
    console.log('>> req. for registering a new user')

    registerForm = req.body;
    
    //valid input NOW create newUser in DB
    try{

      //To connect
      database.connect();
      console.log(database)

      const existsBefore = await existsBeforeInDB(registerForm);
      if(existsBefore)throw error("same user exist in DB");

      const userID = await registerNewUser(registerForm);
      console.log(userID)
      console.log(!isSessionActive(req))
      if(!isSessionActive(req)){
        await createSession(req,res,userID);
      }
      //** 
      res.redirect("/")

      }

    catch (e){
      console.log("error at regiater route POST /new: ");
      console.log(e)

      // req.session['error'] = "This Email is Already Registered.";
      // res.locals.error = req.session.error;

      res.render("register",{err:"This Email is Already Registered."})

    }
    finally{      
    
    }   
})


//----------------------------------------Func.
const existsBeforeInDB  = async (form)=> {
  //only check if the same email exist before
    let email = form['email']
    const isNew = await User.where("email").equals(email).count() === 0 ;
    // console.log(email+" isNew? "+ isNew)
    return !isNew; 
}
const registerNewUser = async (registerForm)=>{
  
  const fullName =  registerForm["full-name"].split(" ")
  const firstName = fullName[0];
  const lastName = fullName[1];
  const email = registerForm['email'];
  const pwd = registerForm["password"]

  // console.log(firstName, lastName )

  // ----------------------------
  // try to create new user
   const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    pwd: pwd,
  })

  newUser.save()
  
  //log the result
  console.log(newUser);

  const userID  = newUser['_id'].toString();
  return userID;

}


