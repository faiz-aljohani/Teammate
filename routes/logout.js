const express = require('express')
const router = express.Router()
module.exports = router;
const {isSessionActive} = require('./login')


router.get("/", async (req,res) => {

    // req.session = null;

    const cookies = req.cookies;

    for (let prop in cookies) {   
    res.clearCookie(prop); //Or res.cookie(prop, '', {expires: new Date(0)});
    }
    
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("isSessionActive " + isSessionActive(req))
            res.redirect("/login");

        }
    });
})