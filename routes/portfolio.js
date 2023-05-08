const express = require('express')
const router = express.Router()
const ProjectModel = require("../models/Projects.js");
const UserModel = require("../models/User.js")
// const database = require("../db");
const app = express();
const bodyParser = require("body-parser")
const ejs = require("ejs")
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

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
        const Result = await ProjectModel.find({userID: userID, completed: true})
        
        res.render("portfolio",{projects: Result, viewerID: userID, ownerID: userID}) 
    }

})
router.get("/:id",async (req, res)=>{
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        const ownerID = req.params.id;
        const Result = await ProjectModel.find({userID: ownerID, completed: true});
        
        
        userID = req.session.userID; // the current user
        const ownerFirstName = await UserModel.findOne({_id: ownerID});
        // console.log(ownerFirstName);
        // console.log(ownerFirstName.firstName);
        res.render("portfolio",{projects: Result, viewerID: userID, ownerID: ownerID, ownerFirstName: ownerFirstName.capitalize()}) ;
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

module.exports = router;