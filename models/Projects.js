const mongoose = require("mongoose");

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
    teammates:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }], // should define UserSchema
    established: Boolean
})

const ProjectModel = mongoose.model("projects", ProjectSchema);

module.exports = { ProjectModel };