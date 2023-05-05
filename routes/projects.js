const database = require("../db.js");
const project = require("../models/Projects.js");

database.connect();

const p = project.create({
    title: "First Project",
    Description: "This is the first project",
    skills: ["JS", "CSS", "HTML"],
    teammates:[],
    established: false
  })

  p.save();

database.disconnect();

//   title: {
//     type: String,
//     required: true,
// },
// Description: {
//     type: String,
//     required: true,
// },
// // img: {
// //     data: Buffer,
// //     contentType: String
// // },
// skills: [String],
// teammates:[{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users"
// }], // should define UserSchema
// established: Boolean



// mongoose.connect("mongodb+srv://faiz:Tr123456t@teammatedb.oxmk3de.mongodb.net/Teammate",{useNewUrlParser: true})
// const ProjectModel = require("../models/Projects").ProjectModel;

// const calcProject = new ProjectModel({
//     title: "Calculator project",
//     Description: "calculator using javascript css and html",
//     skills: ["JS","CSS","HTML"],
//     Established: 0
// })
// calcProject.save();
// mongoose.disconnect();
// ProjectModel.find({title: "Calculator project"}).then( (data) =>{
//     data = data[0]
//     console.log(data.title)
//     console.log(data)
//     console.log("-------------------------")
//     console.log(data.skills[0])
// })
// .catch((err)=>{
//     console.log(err)
//     console.log(err)
// });
// console.log("code finished running")
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
