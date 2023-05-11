const mongoose = require("mongoose");

const application = new mongoose.Schema({
    userID:  {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    message:  {
        type: String,
        required: true,
    }
})

const ProjectSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: String,
    skills: [String],
    teammates:[{
        userID:  {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
    }], // should define UserSchema
    established: Boolean,
    completed: Boolean,  
    applications: [application]
})

const ProjectModel = mongoose.model("projects", ProjectSchema);

module.exports = ProjectModel;
