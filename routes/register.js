const http  =  require('http');
const express = require('express')
const router = express.Router()
const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = router;

const uri = "mongodb+srv://shalahe30:Tr123456t@teammatedb.oxmk3de.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const DB = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await DB.connect();
    // Send a ping to confirm a successful connection 
    await DB.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await DB.close();
  }
}

runDB().catch(console.dir);

let registerForm ; 

router.get('/', (req,res)=>{
    console.log('GET req. in register route')
})
router.post('/new', (req,res)=>{

    console.log('>req. for registering a new user')

    registerForm = req.body;
    
    if(!validateInputs(registerForm)){
        res.statusMessage = "Something wrong with the (registerForm)"
        res.status(500).end()
    }
    //valid input NOW create newUser in DB
    DBres = DB.createUser({
        user: "Test100",
        pwd: "123456",
        roles: [
            "dbAdminAnyDatabase"
        ]
    })
    console.log(DBres)
    res.send("Ok");
    
    // res.render()
})

//----------------------------------------Func.
const validateInputs  = (inputs)=>{
    
    //1st full-name is always okay (*)
    //2nd email have to be correct and unique in the DB
    //3rd passward have to be identical
    
    return true; //tmp
}


//---------------------------------old Code

// const { MongoClient } = require('mongodb');
// const client = new MongoClient('mongodb+srv://shalahe30:Tr123456t@teammatedb.oxmk3de.mongodb.net/test');



// const checkInputs = (body)=>{
//     //here check the cardinlity
//     return true; //tmp
// }


// const registerUser =  (req, res)=>{
//     if(!checkInputs(req.body)){
//         res.statusCode = 505;
//         console.log("Registration Failed!")
//         res.end('Registration Failed!');
//         return 
//     }
//     res.statusCode = 200;
//     client.db.createUser({
//         user: "Test2",
//         pwd: "123456",
//         roles: [
//             { role: "read", db: "users"}
//         ]
//     })

//     console.log("Registration Success!")
//     res.end('Registration Success!');
//     return ;
// };

