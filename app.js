const express = require('express');

const app = express();
app.use(express.static('public'))

const bodyParser = require("body-parser")
const ejs = require("ejs")
const https = require('https');
const http = require('http');

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const portfolioRouter = require('./routes/portfolio');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static('public'))


app.use(express.urlencoded({extended:true}))

const { log } = require('console');

const database = require('./db');
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

app.get("/login", (req,res) => {
  res.render("loginPage",{})
})

app.use("/portfolio",portfolioRouter)

app.use("/register",registerRouter)

app.use("/login",loginRouter)

app.listen(3000 || process.env.PORT, () => {
  console.log('The server is running on port number 3000');

})


//-------------------------------------------------------