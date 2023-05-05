const express = require('express')
const router = express.Router()
const ProjectModel = require("../models/Projects").ProjectModel;

router.get("/", async (req,res) => {

    // getting user id from request/session
    const Result = await ProjectModel.find({/* users: USER ID HERE */})//TODO: change this from finding all projects to only getting projects with the desired user 
    console.log(Result);
    console.log(typeof(Result));
    res.render("portfolio",{projects: Result})
})

module.exports = router;