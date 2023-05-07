const express = require('express')
const projects = require("../models/Projects.js");
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
    
        res.render("project", {project: project});
    }


})    
