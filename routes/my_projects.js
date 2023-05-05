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
const database = require("../db.js");
const project = require("../models/Projects.js");
const router = express.Router()

module.exports = router;
database.connect();

router.get('/', (req,res)=>{
    console.log('GET req. in my_projects route')
    res.render("my_projects",{})
})

router.post("/addProject", upload.array("images") , async (req,res) => {
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
        title: title,
        description: description,
        img: imgs,
        skills: skills,
        teammates: [],
        established: false
      })
    
      newProject.save()
  }