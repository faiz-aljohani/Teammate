const express = require('express')
const router = express.Router()
module.exports = router;
const users = require("../models/User.js");
const { route } = require('./register.js');
let alert = null;

router.get("/", async (req,res) => {
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        query = {_id: req.session.userID}
        let email;
        let fullName;

        await users.find(query).then(function(user) {
            user = user[0];
            email = user.email;
            fullName = user.firstName + " " + user.lastName;
        })
        .catch(function (err) {
            console.log(err);
    });
        res.render("settings", {
            name: fullName,
            email: email,
            alert: alert
        })
        alert = null;
    }
})

router.post("/", async (req,res) => {
    const email = req.body.email;
    let fullName = req.body.fullName;
    fullNameList = fullName.split(" ");
    let fName = null;
    let lName = "";
    fName = fullNameList[0];
    if(fullNameList.length > 1){
        for(let i = 1; i < fullNameList.length;i++){
            lName = lName + fullNameList[i] + " ";
        }
        lName = lName.substring(0,lName.lastIndexOf(" "));

    }else{
        lName = " ";
    }


    const update = { 
        firstName: fName,
        lastName: lName,
        email: email 
    };

    query = {_id: req.session.userID}

 
    await users.findOneAndUpdate(query, update, {
        new: true
      }).then(() => {


        res.render("settings", {
            name: fullName,
            email: email,
            flag: 1, // Flag 1 means alert for success
            alert: {
                type: "success",
                title: "Saved!",
                message: " You have changed your information successfully."
            }

        })

      }).catch((err) => {
        if(err.code == 11000){
            res.render("settings", {
                name: fullName,
                email: email,
                alert: {
                    type: "danger",
                    title: "Error!",
                    message: " The Email is used before."
                }
            })
        }else{
            res.render("settings", {
                name: fullName,
                email: email,
                alert: {
                    type: "danger",
                    title: "Error!",
                    message: " Something Went Wrong, Please Try Again Later."
                }
            })
        }
      });

})

router.post("/changePassword", async (req,res)=>{
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let userID = req.session.userID;

    await users.findOne({_id: userID}).then(user => {
        if(user.pwd == oldPassword){

            user.updateOne({pwd: newPassword}).then(() => {
                alert = {
                    type: "success",
                    title: "Saved!",
                    message: " You have changed your password successfully."
                }
                res.redirect("/settings")
            })

        }else{
            alert = {
                type: "danger",
                title: "Error!",
                message: " Old Password is not correct!"
            }
            res.redirect("/settings")
        }
    })

})