const http  =  require('http');
const express = require('express')
const router = express.Router()
const { error } = require('console');

const database = require("../db");
const User = require("../models/User");

module.exports = router;
let registerForm ; 


//----------------------------------Client Req.
router.get('/', (req,res)=>{
    console.log('GET req. in register route')
    res.render("RegisterPage.ejs",{})
})

router.post('/new', async (req,res)=>{
    console.log('>> req. for registering a new user')

    registerForm = req.body;
    
    //valid input NOW create newUser in DB
    try{

      //To connect
      database.connect();

      const existsBefore = await existsBeforeInDB(registerForm);
      if(existsBefore)throw error("same user exist in DB");

      registerNewUser(registerForm);

      //** 
      res.redirect("/login")

      }

    catch (e){
      console.log("error at regiater route POST /new: ");
      res.statusMessage = "Something wrong with the (registerForm)"
      res.status(500).end()
    }
    finally{      
      // To disconnect
      database.disconnect();
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

}


