const express = require('express')
const userModel = require("../models/User.js");
const router = express.Router()




let userID;

router.get("/", async (req,res) => {
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        const Result = await userModel.find({})
        try{
            res.render("find-users",{users: Result})
        }catch(error){
            console.log("you did somethign wrong!")
            // console.log(error)
        }
    }

})
router.post("/search", async (req,res)=> {
    const form = req.body;
    const names = form.searchQuery.trim().split(" ");
    let firstName = "NOTFOUND";
    let lastName = "NOTFOUND";
    if (names.length == 2 ){
        firstName = names[0];
        lastName = names[1];
    }
    regexFirstName = new RegExp(`${firstName}`,"i");
    regexLastName = new RegExp(`${lastName}`,"i");
    regex = new RegExp(`${form.searchQuery}`,"i");

    const query = {
        $or: [ 
            {firstName: {$regex: regex}}, 
            {lastName: {$regex: regex}},

            {firstName: {$regex: regexFirstName}}, 
            {lastName: {$regex: regexLastName}},
            {description: {$regex: regex}},
            {email:{$regex: regex}} 
        ]
    }
    let usersFound;
    await userModel.find(query)
        .then(function(usersList) {
            usersFound = usersList;
        })
        .catch(function (err) {
            console.log(err);
    });
    res.render("find-users",{users: usersFound})
})
module.exports = router;