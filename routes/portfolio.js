const express = require('express')
const router = express.Router()
const ProjectModel = require("../models/Projects.js");
const UserModel = require("../models/User.js")
// const database = require("../db");
const app = express();
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require("mongoose");

app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const path = require("path");
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({storage: storage});

let userID;

router.get("/", async (req,res) => {
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        console.log('GET req. in portfolio route')
        userID = req.session.userID;
        let userName
        await UserModel.findOne({_id: userID}).then(user => {
            userName = user.firstName + " " + user.lastName;
        })

        const Result = await ProjectModel.find({
                completed: true,
                $or: [ 
                {userID: userID,},
                {"teammates.userID": userID} // checks if the user is a teammate of any project
                ]
        })
        // console.log(mongoose.Types.ObjectId.createFromHexString(userID))
        // console.log(req.session.userID)
        
        try{
            const User = await UserModel.findOne({_id: mongoose.Types.ObjectId.createFromHexString(userID)})
            // console.log(User)
            // console.log(User.description)
            res.render("portfolio",{projects: Result, viewerID: userID, ownerID: userID, ownerFirstName: "", userName: userName,description: User.description})

        }catch(error){
            console.log("you did somethign wrong!")
            // console.log(error)
        }
    }

})
router.get("/:id",async (req, res)=>{
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        const ownerID = req.params.id;
        console.log(ownerID)
        const Result = await ProjectModel.find({userID: ownerID, completed: true});
        
        
        userID = req.session.userID; // the current user
        let user;
        await UserModel.find({_id: ownerID})
        .then(function(userList) {
            user = userList[0];
            console.log(userList);
        })
        .catch(function (err) {
            // console.log(err);
            console.log("invalid user: user was not found in the database")
            res.redirect("/portfolio");
            return;
        });
        if (user != null){
            let userName = user.firstName + " " + user.lastName;

            res.render("portfolio",{projects: Result, viewerID: userID, ownerID: ownerID, userName: userName,description: user.description}) ;
        }
        
    }
})
router.post("/",upload.array("images"), async (req,res) =>{
    const addPrevProjectForm = req.body;
    // console.log(addPrevProjectForm)
    // Just to work with multiple files
    let path = "";
    console.log(req.files)
    if(req.files){
        req.files.forEach(file => {
            path = path + file.path + ",";
        })
        path = path.substring(0, path.lastIndexOf(","))
        console.log(path);
    }

    addPrevProject(addPrevProjectForm, path)
    res.redirect("/portfolio")
})

function addPrevProject(addPrevProjectForm, imgs){
    const title = addPrevProjectForm.title;
    const description = addPrevProjectForm.description;
    const skills = (addPrevProjectForm.skills).split(",");

    const newProject = new ProjectModel({
        userID: userID,
        title: title,
        description: description,
        img: imgs,
        skills: skills,
        teammates: [],
        established: true,
        completed: true,
        applications: []
      })
    console.log(newProject)
    newProject.save()
}
router.post("/searchPortfolio", async (req,res)=>{
    const form = req.body;

    userID = req.session.userID; 

    const regex = new RegExp(`${form.searchQuery}`,"i");
    const query = {
        userID: userID,
        completed: true,
        $or: [ 
            { title: {$regex: regex} }, 
            {description: {$regex: regex}}, 
            {skills: {$regex: regex}} 
        ]
    }
    let projectsFound;
    await ProjectModel.find(query)
        .then(function(projectsList) {
            projectsFound = projectsList;
        })
        .catch(function (err) {
            console.log(err);
    });
    res.render("portfolio",{projects: projectsFound, viewerID: userID, ownerID: userID, ownerFirstName: "",description: user.description})
});

// to save the edit on about me field
router.post("/updateDescription", async (req,res)=>{
    console.log('post req. to update in portfolio route')

    userID = req.session.userID; 
    let newDescription = await req.body;

    // console.log(req.body)
    // console.log(req)

    console.log(newDescription)
    console.log(newDescription['description'])
    console.log(userID)
    console.log(mongoose.Types.ObjectId.createFromHexString(userID))



    try{
        const dbReq = await UserModel.updateOne(
            {_id: mongoose.Types.ObjectId.createFromHexString(userID)},
            {description: newDescription['description']}
        );

    }
    catch(e){
        console.log(e)
    }
    

    res.end();
    })  

// to save the edit on about me field
router.post("/deleteProject", async (req,res)=>{
    console.log('post req. to delete Project in portfolio route')

    let projectId = await req.body.projectId;

    console.log(req.body)
    // console.log(req)

    // console.log(projectId)
    // console.log(mongoose.Types.ObjectId.createFromHexString(projectId))



    try{

        const oldTeammates =  await ProjectModel.findOne({_id: mongoose.Types.ObjectId.createFromHexString(projectId)})
        console.log(oldTeammates)

        console.log(oldTeammates.teammates)
        let TeammatesList = oldTeammates.teammates

        if(TeammatesList.length == 0 ){
            //delete the whole projecT
            await ProjectModel.deleteOne(
            {_id: mongoose.Types.ObjectId.createFromHexString(projectId)},
        )
        }else{
            //UPDATE OWNER
            await ProjectModel.updateOne(
                {_id: mongoose.Types.ObjectId.createFromHexString(projectId)},
                {userID: TeammatesList[0]._id.toString()}
            )
            //REMOVE the owner from teammates
            TeammatesList.shift()

            // Update teammates
            await ProjectModel.updateOne(
                {_id: mongoose.Types.ObjectId.createFromHexString(projectId)},
                {teammates: TeammatesList}
            )

        }
       
        // await UserModel.updateOne
        // const dbReq = await UserModel.updateOne(
        //     {_id: mongoose.Types.ObjectId.createFromHexString(userID)},
        //     {teammates: newTeammates}
        // );

        // const dbReq = await ProjectModel.up(
        //     {_id: mongoose.Types.ObjectId.createFromHexString(projectId)},
        // );

    }
    catch(e){
        console.log(e)
    }
    

    res.end();
    })  


module.exports = router;