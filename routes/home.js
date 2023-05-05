const express = require('express')
const projects = require("../models/Projects.js");
const router = express.Router()
module.exports = router;

module.exports = router;
router.get("/", async (req,res) => {
    let projectsList2;

    await projects.find({})
        .then(function(projectsList) {
            projectsList2 = projectsList;
        })
        .catch(function (err) {
            console.log(err);
    });
    res.render("index",{projectsList: projectsList2})
})

router.get("/projects/:id", (req,res) => {
    res.render("project", {});
})    
