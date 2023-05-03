const http  =  require('http');
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://shalahe30:Tr123456t@teammatedb.oxmk3de.mongodb.net/test');



const checkInputs = (body)=>{
    //here check the cardinlity
    return true; //tmp
}


const registerUser =  (req, res)=>{
    if(!checkInputs(req.body)){
        res.statusCode = 505;
        console.log("Registration Failed!")
        res.end('Registration Failed!');
        return 
    }
    res.statusCode = 200;
    client.db.createUser({
        user: "Test2",
        pwd: "123456",
        roles: [
            { role: "read", db: "users"}
        ]
    })

    console.log("Registration Success!")
    res.end('Registration Success!');
    return ;
};

module.exports.registerUser = registerUser;