const mongoose  = require("mongoose");

const chat = new mongoose.Schema({
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

const chatSchema = new mongoose.Schema({

    projectID: {
        type: String,
        required: true,
    },

    chatHistory: [chat]

})

module.exports= mongoose.model("Chat",chatSchema);