// const express = require('express');
const https = require('https');
const http = require('http');
const register = require('./register.js')


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


//-------------------------------------------------------

const server = http.createServer(requestListener)
const host = 'localhost';
const port = 8000;

server.listen(port, host, () => {
const { address, port } = server.address();
console.log(`Server is listening on: http://${address}:${port}`);
})


console.log('here')
register.registerUser('1','0')

// ---------------------------------------------------------- I think we need to get certificate 1st 
// Create a service (the app object is just a callback).
// var app = express();
// Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(443);
// var options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
// };
