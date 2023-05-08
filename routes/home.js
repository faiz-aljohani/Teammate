const express = require('express')
const projects = require("../models/Projects.js");
const {isSessionActive} = require('./login')

const router = express.Router()
module.exports = router;
router.get("/", async (req,res) => {
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        let projectsList2;
        const query = {
            established: false,
            completed: false
        }
        await projects.find(query)
            .then(function(projectsList) {
                projectsList2 = projectsList;
            })
            .catch(function (err) {
                console.log(err);
        });
        res.render("index",{projectsList: projectsList2})
    }
})