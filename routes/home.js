const express = require('express')
const projects = require("../models/Projects.js");
const router = express.Router()
module.exports = router;
// const database = require("../db.js");

// database.connect();


module.exports = router;

router.get("/", (req,res) => {
  console.log('GET req. in Home route') 
  aa();
//   console.log(projects.find());
  res.render("index",{})
})

const aa = () => {
    projects.find({})
    .then(function(persons) {
        // console.log(persons);
        persons.forEach((person) => {
            console.log(person);
        })
        
        })
    .catch(function (err) {
        console.log(err);
});
}

    
