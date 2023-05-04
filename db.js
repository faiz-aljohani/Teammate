const mongoose = require('mongoose');

const connectionParms = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect('mongodb+srv://emad:123@teammatedb.oxmk3de.mongodb.net/Teammate?retryWrites=true&w=majority', connectionParms)
.then(()=>{
    console.log("Connected Successfully");
})
.catch((err) => {
    console.log(err);
})

