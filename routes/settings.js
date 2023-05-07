const express = require('express')
const router = express.Router()
module.exports = router;

router.get("/", async (req,res) => {
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        const users = require("../models/User.js");
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
        })
    }
})