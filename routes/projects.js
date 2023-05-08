const mongoose =  require("mongoose");

mongoose.connect("mongodb+srv://faiz:Tr123456t@teammatedb.oxmk3de.mongodb.net/test",{useNewUrlParser: true})
//^ 
//see the connecation to db in (register.js)

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    img: {
        data: Buffer,
        contentType: String
    },
    skills: [String],
    // teammates:[userSchema], // should define UserSchema
    established: Boolean
})

const ProjectModel = mongoose.model("projects",ProjectSchema);

const calcProject = new ProjectModel({
    title: "Calculator project",
    Description: "calculator using javascript css and html",
    skills: ["JS","CSS","HTML"],
    Established: 0
})
calcProject.save();
// mongoose.disconnect();

// const express = require('express');
// const http  =  require('http');
// const { MongoClient } = require('mongodb');
// const client = new MongoClient('mongodb://127.0.0.1:27017/');

// const router = express.Router();

// router.get("/portfolio.html", async (req,res) =>{
//     try{
        
//     }catch(err){
//         res.json(err);
//     }
// })

// db.projects.insertOne({
//     title: "Javascript Project",
//     description: "Simple javascript calculator project",
//     skills: ["JS","HTML","CSS"],
//     established: 0
// });
