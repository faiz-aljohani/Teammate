const express = require('express');
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
const project = require("../models/Projects.js");
const router = express.Router()

module.exports = router;

let userID;

router.get('/', async (req,res)=>{
    if(!isSessionActive(req))
        res.redirect("/login");
    else{
        userID = req.session.userID;
        console.log('GET req. in my_projects route ' + req.session.userID)
        const Result = await project.find(
        {
            completed: false,
            $or: [ 
            {userID: userID,},
            {"teammates.userID": userID} // checks if the user is a teammate of any project
            ]
        });
        res.render("my_projects",{projectsList: Result})
    }
})

router.post("/", upload.array("images") , async (req,res) => {
    const addProjectForm = req.body;

    // Just to work with multiple files
    let path = "";
    if(req.files){
        req.files.forEach(file => {
            path = path + file.path + ",";
        })
        path = path.substring(0, path.lastIndexOf(","))
        console.log(path);
    }

    addProject(addProjectForm, path)
    res.redirect("/my-projects")
  })

  const addProject = (addProjectForm, imgs) => {
    const title = addProjectForm.title;
    const description = addProjectForm.projectDescription;
    const skills = (addProjectForm.skills).split(",");
    const images = addProjectForm.images;

    const newProject = new project({
        userID: userID,
        title: title,
        description: description,
        img: imgs,
        skills: skills,
        teammates: [],
        established: false,
        completed: false,
        applications: []
      })
    
      newProject.save()
  }
router.post("/searchMyProjects", async (req,res)=>{
    const form = req.body;

    userID = req.session.userID; 

    const regex = new RegExp(`${form.searchQuery}`,"i");
    const query = {
        userID: userID,
        $or: [ 
            { title: {$regex: regex} }, 
            {description: {$regex: regex}}, 
            {skills: {$regex: regex}} 
        ]
    }
    let projectsFound;
    await project.find(query)
        .then(function(projectsList) {
            projectsFound = projectsList;
        })
        .catch(function (err) {
            console.log(err);
    });
    res.render("my_projects",{projectsList: projectsFound})
}); 