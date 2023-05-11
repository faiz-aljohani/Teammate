const express = require('express')
const projects = require("../models/Projects.js");
const users = require("../models/User.js");
const router = express.Router()
module.exports = router;
let project
let projectOwner;
const mongoose =  require("mongoose");

router.get("/:id", async (req,res) => {
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        userID = req.session.userID;
        // let project;
        const query = {
            _id: req.params.id,
        }
        
        await projects.find(query)
            .then(function(projectsList) {
                project = projectsList[0];
            })
            .catch(function (err) {
                console.log(err);
        });
        
        projectOwner = await users.find({_id: project.userID})
        res.render("project", {project: project, applications: project.applications, projectOwner: projectOwner[0],userID: userID, alert: null});
    }
})    

router.post("/:projectID", async (req,res)=>{
    const userID = req.session.userID;
    const projectID = req.params.projectID;
    const applications = project.applications;
    let appliedBefore = false;
    
    applications.forEach(application => {
        if(application.userID == userID){
            appliedBefore = true;
            // res.redirect("/projects/" + projectID);
            // res.render("project", {project: project, applications: project.applications, projectOwner: projectOwner[0],userID: userID, alert: alert});

        } 
    })

    if(appliedBefore){
        let alert = {
            type: "danger",
            title: "Error!",
            message: " You have applied before."
        }
        res.render("project", {project: project, applications: project.applications, projectOwner: projectOwner[0],userID: userID, alert: alert});
    
    }else{
        let userName;
        await users.find({_id : userID}).then((users) => {
            userName = users[0].firstName + " " + users[0].lastName;
        }).catch((err) => {
            
        });

        applications.push({
            userID: userID,
            message: req.body.applicationMessage,
            userName: userName
        })

        projects.findOneAndUpdate({_id: projectID},{applications: applications}, {new: true})
        .then((result) => {
            res.render("project", {project: project, applications: project.applications, projectOwner: projectOwner[0],userID: userID, alert: null});

        }).catch((err) => {
            let alert = {
                type: "danger",
                title: "Error!",
                message: " Please try again later."
            }
            res.render("project", {project: project, applications: project.applications, projectOwner: projectOwner[0],userID: userID, alert: alert});
        });
    }
})

router.post("/:projectID/remove", async (req,res)=>{
    const userID = req.session.userID;
    const projectID = req.params.projectID;

    if(project.userID != userID){
        res.redirect("projects/" + projectID)
    }

    projects.findOneAndDelete({_id: projectID}).then(result => {
        res.redirect("/")
    }).catch(err => {
        let alert = {
            type: "danger",
            title: "Error!",
            message: " Please try again later."
        }
        res.render("project", {project: project, applications: project.applications, projectOwner: projectOwner[0],userID: userID, alert: alert});
    });



})

