const express = require('express')
const projects = require("../models/Projects.js");
const users = require("../models/User.js");
const router = express.Router()
module.exports = router;

module.exports = router;

router.get("/:id", async (req,res) => {
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        let project;
        const query = {
            _id: req.params.id,
        }
        
        await projects.find(query)
            .then(function(projectsList) {
                project = projectsList[0];
                console.log(projectsList);
            })
            .catch(function (err) {
                console.log(err);
        });
        const userList = await users.find({})
        // console.log(userList)
        res.render("project", {project: project, userList: userList });
    }


})    
