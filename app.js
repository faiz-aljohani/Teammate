const express = require('express');

const app = express();
app.use(express.static('public'))

const bodyParser = require("body-parser")
const ejs = require("ejs")
const https = require('https');
const http = require('http');

const registerRouter = require('./routes/register');
const projects = require('./projects.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static('public'))
app.use("/register",registerRouter)
app.use(express.urlencoded({extended:true}))

const { log } = require('console');

//--------------------------------



app.get("/", (req,res) => {
  res.render("index",{})
})

app.get("/my-projects", (req,res) => {
  res.render("my_projects",{})
})

app.get("/settings", (req,res) => {
  res.render("settings",{})
})

app.get("/portfolio", (req,res) => {
  res.render("portfolio",{})
})
app.post("/addPrevProject", async (req,res) =>{
  res.render('portfolio.ejs',{ projects: addPrevProject()/* function running mongodb query */, msg: 'The project has been added' })
})


app.listen(3000 || process.env.PORT, () => {
  console.log('The server is running on port number 3000');
})


//-------------------------------------------------------