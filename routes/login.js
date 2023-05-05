const http  =  require('http');
const express = require('express')
const router = express.Router()
const { error } = require('console');

const connect = require("../db");
const User = require("../User");

connect();
module.exports = router;
let loginForm ; 


//----------------------------------Client Req.
router.get('/', (req,res)=>{
    console.log('GET req. in login route')
    res.render("loginPage",{})
})

router.post('/logging', async (req,res)=>{

    console.log('>> req. for login a user')

    // let email = req.params.email 

    loginForm = req.body;
    
    //valid input NOW create newUser in DB
    try{


      loginUser(loginForm);

      //** 
      console.log(">>logging sccess")
      res.redirect("/")

      }

    catch (e){
      console.log("error at login route POST /new: ");
      res.statusMessage = "Something wrong with the (loginForm)"
      res.status(500).end()
    }    
})


//----------------------------------------Func.

const loginUser = async (loginForm)=>{
  
  const email = loginForm['email'];
  const pwd = loginForm["password"]

  //req.params.id //same name we call it 
  // ----------------------------
  // try to create new user
  const loggingUser = await User.where("email").equals(email).where('pwd').equals(pwd)

  if(loggingUser.length == 0) throw new Error("email OR passward is npt correct")
  
  //log the result

}


