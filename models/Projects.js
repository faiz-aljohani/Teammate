const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: [String],
    skills: [String],
    teammates:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }], // should define UserSchema
    established: Boolean,
    completed: Boolean
})

const ProjectModel = mongoose.model("projects", ProjectSchema);

module.exports = ProjectModel;
