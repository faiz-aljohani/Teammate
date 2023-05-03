const express = require('express');
const app = express();
app.use(express.static('public'))
const bodyParser = require("body-parser")
const ejs = require("ejs")
const https = require('https');
const http = require('http');
const register = require('./register.js')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static('public'))

const { log } = require('console');





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


const requestListener = (req,res)=>{

    const { method } = req;
   
    switch(method) {
      case 'POST':
        return handlePostRequest(req, res);
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }

}

const handlePostRequest = (req, res)=>{

    const { pathname } = new URL(req.url);
   
    //routing the registering req. from client 
    if (pathname === '/register') {
      return register.registerUser(req, res);
    }
}



app.listen(3000 || process.env.PORT, () => {
  console.log('The server is running on port number 3000');
})


//-------------------------------------------------------

// const server = http.createServer(requestListener)
// const host = 'localhost';
// const port = 8000;

// server.listen(port, host, () => {
// const { address, port } = server.address();
// console.log(`Server is listening on: http://${address}:${port}`);
// })




// console.log('here')
// register.registerUser('1','0')

