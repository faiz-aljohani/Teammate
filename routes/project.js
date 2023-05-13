const express = require('express')

const projects = require("../models/Projects.js");
const users = require("../models/User.js");
const chats = require("../models/Chat.js");
const router = express.Router()
module.exports = router;
let project
let projectOwner;
const mongoose =  require("mongoose");
const { log } = require('console');
let alert = null;



//For Chating
const app = require("../app.js")
const io = require("socket.io")(app.server, {cors: {origin: "*"}});

io.on("connection", (socket) => {
    console.log("user connected: " + socket.id);
    socket.on("message", async (data) => {


        socket.broadcast.emit("message", data)


        let chatHistory = []
        await chats.findOne({projectID: data.projectID}).then(result => {
            chatHistory = result.chatHistory;
        })


        chatHistory.push({
            userID: data.userID,
            userName: data.username,
            message: data.message
        })



        chats.findOneAndUpdate({projectID: data.projectID}, {chatHistory: chatHistory}, {new: true})
        .then(result => {
        })
        
    })

})


//========================

router.get("/:id", async (req,res) => {
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        userID = req.session.userID;
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

        if(project.established){

            let isTeammate = false;
            await project.teammates.forEach(teammate => {
                if(teammate.userID == userID){
                    isTeammate = true;
                    return;
                }
            })

            if(!project.completed && (isTeammate || userID == project.userID)){

                await chats.findOne({projectID: project._id}).then(async (chat) => {
                    if(chat == null){
    
                        const newChat = await chats.create({
                            projectID: project._id,
                            chatHistory: []
                          })
                        
                          await newChat.save().then(c => {
                            chat = c;
                          })                    
                    }
                    let userName
                    await users.findOne({_id: userID}).then(user => {
                        userName = user.firstName + " " + user.lastName;
                    })

                    res.render("chat", {project: project, chat: chat, userID: userID, userName:userName});
                })
    
                
            }else{
                res.redirect("/")
            }

            



        }else{
            res.render("project", {project: project, applications: project.applications, projectOwner: projectOwner[0],userID: userID, alert: alert});
            alert = null;
        }
        

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
        } 
    })

    if(appliedBefore){
        alert = {
            type: "danger",
            title: "Error!",
            message: " You have applied before."
        }

        res.redirect("/projects/" + projectID)

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
            alert = null
            res.redirect("/projects/" + projectID)
        }).catch((err) => {
            alert = {
                type: "danger",
                title: "Error!",
                message: " Please try again later."
            }
            res.redirect("/projects/" + projectID)
        });
    }
})

router.post("/:projectID/remove", async (req,res)=>{
    const userID = req.session.userID;
    const projectID = req.params.projectID;

    if(project.userID != userID){
        res.redirect("projects/" + projectID)
    }else{
        projects.findOneAndDelete({_id: projectID}).then(result => {
            res.redirect("/")
        }).catch(err => {
            alert = {
                type: "danger",
                title: "Error!",
                message: " Please try again later."
            }
            res.redirect("/projects/" + projectID)
        });
    
    }


})

router.post("/:projectID/establish", async (req,res)=>{
    const userID = req.session.userID;
    const projectID = req.params.projectID;

    if(project.userID != userID){
        res.redirect("/projects/" + projectID)
    }else{

        projects.findOneAndUpdate({_id: projectID}, {established: true}, {new: true})
        .then(result => {
            res.redirect("/projects/" + projectID)
        }).catch(err => {
            alert = {
                type: "danger",
                title: "Error!",
                message: " Please try again later."
            }
            res.redirect("/projects/" + projectID)
        });
    }
})

router.post("/:projectID/stop", async (req,res)=>{
    const userID = req.session.userID;
    const projectID = req.params.projectID;

    if(project.userID != userID){
        res.redirect("/projects/" + projectID)
    }else{
        projects.findOneAndUpdate({_id: projectID}, {established: false}, {new: true})
        .then(result => {

            chats.findOneAndDelete({projectID: projectID}).then(() => {
                alert = {
                    type: "success",
                    title: "Established!",
                    message: " You have successfully stoped the project"
                }
                res.redirect("/projects/" + projectID)
            })


        
        }).catch(err => {
            alert = {
                type: "danger",
                title: "Error!",
                message: " Please try again later."
            }
            res.redirect("/projects/" + projectID)
        });
    }
})

router.post("/:projectID/complete", async (req,res)=>{
    const userID = req.session.userID;
    const projectID = req.params.projectID;

    if(project.userID != userID){
        res.redirect("/projects/" + projectID)
    }else{
        projects.findOneAndUpdate({_id: projectID}, {completed: true}, {new: true})
        .then(result => {
            res.redirect("/portfolio")
        }).catch(err => {
            alert = {
                type: "danger",
                title: "Error!",
                message: " Please try again later."
            }
            res.redirect("/projects/" + projectID)
        });
    }
})


router.post("/:projectID/accept/:applicationUserID", async (req,res)=>{
    const userID = req.session.userID;
    const projectID = req.params.projectID;
    const applicationUserID = req.params.applicationUserID;

    if(project.userID != userID){
        res.redirect("/projects/" + projectID)
    }else{

        try {

            let applicationUserName;
            await users.findOne({_id: applicationUserID}).then(user => {
                applicationUserName = user.firstName + " " + user.lastName;
            })
    
            let teammates = []
            await projects.findOne({_id: projectID}).then(result => {
                teammates = result.teammates;
            })
    
    
            teammates.push({
                userID: applicationUserID,
                userName: applicationUserName
            })
    
    
            projects.findOneAndUpdate({_id: projectID}, {teammates: teammates}, {new: true})
            .then(result => {
                alert = {
                    type: "success",
                    title: "Accepted!",
                    message: " You have successfully Accepted the user"
                }
                res.redirect("/projects/" + projectID)
            }).catch(err => {
                alert = {
                    type: "danger",
                    title: "Error!",
                    message: " Please try again later."
                }
                res.redirect("/projects/" + projectID)
            });
            
        } catch (error) {

            alert = {
                type: "danger",
                title: "Error!",
                message: " Please try again later."
            }
            res.redirect("/projects/" + projectID)
            
        }


    }
})


router.post("/:projectID/kick/:applicationUserID", async (req,res)=>{
    const userID = req.session.userID;
    const projectID = req.params.projectID;
    const applicationUserID = req.params.applicationUserID;

    if(project.userID != userID){
        res.redirect("/projects/" + projectID)
    }else{

        try {

            let teammates = []
            await projects.findOne({_id: projectID}).then(result => {
                teammates = result.teammates;
            })

            teammates.forEach(teammate => {
                if(teammate.userID == applicationUserID){
                    teammates.pop(teammate)
                }
            })


            projects.findOneAndUpdate({_id: projectID}, {teammates: teammates}, {new: true})
            .then(result => {
                alert = {
                    type: "success",
                    title: "Success!",
                    message: " You have successfully Kicked the user"
                }
                res.redirect("/projects/" + projectID)
            }).catch(err => {
                alert = {
                    type: "danger",
                    title: "Error!",
                    message: " Please try again later."
                }
                res.redirect("/projects/" + projectID)
            });
            
        } catch (error) {

            alert = {
                type: "danger",
                title: "Error!",
                message: " Please try again later."
            }
            res.redirect("/projects/" + projectID)
            
        }

        
    }
})


router.post("/:projectID/remove/:applicationUserID", async (req,res)=>{
    const userID = req.session.userID;
    const projectID = req.params.projectID;
    const applicationUserID = req.params.applicationUserID;

    if(project.userID != userID){
        res.redirect("/projects/" + projectID)
    }else{

        try {

            let applications = []
            await projects.findOne({_id: projectID}).then(result => {
                applications = result.applications;
            })


            applications.forEach(application => {
                if(application.userID == applicationUserID){
                    applications.pop(application)
                }
            })


            projects.findOneAndUpdate({_id: projectID}, {applications: applications}, {new: true})
            .then(result => {
                alert = {
                    type: "success",
                    title: "Removed!",
                    message: " You have successfully removed the application"
                }
                res.redirect("/projects/" + projectID)
            }).catch(err => {
                alert = {
                    type: "danger",
                    title: "Error!",
                    message: " Please try again later."
                }
                res.redirect("/projects/" + projectID)
            });
            
        } catch (error) {

            alert = {
                type: "danger",
                title: "Error!",
                message: " Please try again later."
            }
            res.redirect("/projects/" + projectID)
            
        }

        
    }
})
