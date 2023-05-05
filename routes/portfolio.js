const express = require('express')
const router = express.Router()
const ProjectModel = require("../models/Projects.js");
const database = require("../db");



router.get("/", async (req,res) => {
    console.log('GET req. in portfolio route')
    // getting user id from request/session
    await database.connect();
    const Result = await ProjectModel.find({/* users: USER ID HERE */})//TODO: change this from finding all projects to only getting projects with the desired user 
    // console.log(Result);
    // console.log(typeof(Result));
    res.render("portfolio",{projects: Result})
})

module.exports = router;