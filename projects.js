// import mongoose from "mongoose";

// const ProjectSchema = new mongoose.Schema({
//     title: {
//         type:string,
//         required: true,
//     },
//     Description: {
//         type: string,
//         required: true,
//     },
//     img: {
//         data: Buffer,
//         contentType: String
//     },
//     skills: [string],
//     teammates:[UserSchema], // should define UserSchema
//     established: Boolean
// })

// export const ProjectModel = mongoose.model("projects",ProjectModel);
const express = require('express');
const http  =  require('http');
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017/');

const router = express.Router();

router.get("/portfolio.html", async (req,res) =>{
    try{
        
    }catch(err){
        res.json(err);
    }
})

db.projects.insertOne({
    title: "Javascript Project",
    description: "Simple javascript calculator project",
    skills: ["JS","HTML","CSS"],
    established: 0
});
