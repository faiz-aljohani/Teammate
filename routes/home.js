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
        res.render("index",{projectsList: projectsList2, alert: null, carousel: true})
    }
})
router.post("/searchHome", async (req,res)=>{
    const form = req.body;

    const regex = new RegExp(`${form.searchQuery}`,"i");
    const query = {
        established: false,
        completed: false,
        $or: [ 
            { title: {$regex: regex} }, 
            {description: {$regex: regex}}, 
            {skills: {$regex: regex}} 
        ]
       
    }
    let projectsFound;
    // let projectsFromDesc;
    // let projectsFromSkills;
    await projects.find(query)
        .then(function(projectsList) {
            projectsFound = projectsList;
        })
        .catch(function (err) {
            console.log(err);
    });
    res.render("index",{projectsList: projectsFound, alert: null})
});

router.post("/search", async (req,res)=>{
    const form = req.body;

    const regex = new RegExp(`${form.searchQuery}`,"i");
    const query = {
        established: false,
        completed: false,
        $or: [ 
            { title: {$regex: regex} }, 
            {description: {$regex: regex}}, 
            {skills: {$regex: regex}} 
        ]
       
    }
    let projectsFound;
    // let projectsFromDesc;
    // let projectsFromSkills;
    await projects.find(query)
        .then(function(projectsList) {
            projectsFound = projectsList;
        })
        .catch(function (err) {
            console.log(err);
    });
    res.render("index",{projectsList: projectsFound, alert: null, carousel: false})
});

router.get("/search", async (req,res)=>{
    res.redirect("/")
});