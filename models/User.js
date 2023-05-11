const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        maxLength: 20, 
        required: true,
    },
    lastName:{
        type: String,
        maxLength: 20, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true // `email` must be unique
    },
    pwd: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: ()=>Date.now(),
    },
    updatedAt: {
        type: Date,
        default: ()=>Date.now(),
    },
    description: {
        type: String
    }

})

module.exports= mongoose.model("User",userSchema);