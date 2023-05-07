const express = require('express')
const router = express.Router()
module.exports = router;

router.get("/", async (req,res) => {
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        req.session.destroy();
        res.redirect("/login");

    }
})