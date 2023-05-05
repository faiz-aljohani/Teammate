const mongoose = require('mongoose');

const connectionParms = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// To connect for the database
exports.connect = ()=>{
 mongoose.connect('mongodb+srv://faiz:Tr123456t@teammatedb.oxmk3de.mongodb.net/Teammate?retryWrites=true&w=majority', connectionParms)
.then(()=>{
    console.log("Connected Successfully");
})
.catch((err) => {
    console.log(err);
})
}

// To disconnect for the database
exports.disconnect = ()=>{
    mongoose.disconnect().then(()=>{
        console.log("disconnected Successfully");
    }).catch((err) => {
        console.log(err);
    })
}