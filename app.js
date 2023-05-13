const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
const server = require('http').createServer(app);
exports.server = server;

const bodyParser = require("body-parser")
const ejs = require("ejs")
const https = require('https');
const http = require('http');
const MongoStore = require("connect-mongo");
const session = require("express-session");
const database = require("./db");
database.connect();

const registerRouter = require('./routes/register');
const {loginRouter} = require('./routes/login');
const myProjectsRouter = require('./routes/my_projects');
const portfolioRouter = require('./routes/portfolio');
const homeRouter = require('./routes/home');
const projectRouter = require('./routes/project');
const settingRouter = require('./routes/settings');
const logoutRouter = require('./routes/logout');
const findUsersRouter = require('./routes/find-users')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('public'))
app.use("/images",express.static('images'))

app.use(express.urlencoded({extended:true}))

app.use(session({
  secret: 'on4xm@k3defa29mo%al',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'strict',
    maxAge: null
  },
  store: MongoStore.create({ 
    mongoUrl: 'mongodb+srv://emad:123@teammatedb.oxmk3de.mongodb.net/Teammate?retryWrites=true&w=majority',
    autoRemove: 'native' 
})
}))

const { log } = require('console');

//--------------------------------


// app.get("/login", (req,res) => {
//   res.render("login",{error:"",info:""})
// })

app.use("/", homeRouter)
app.use("/settings", settingRouter)
app.use("/logout", logoutRouter)
app.use("/portfolio",portfolioRouter)
app.use("/register",registerRouter)
app.use("/login",loginRouter)
app.use("/my-projects",myProjectsRouter)
app.use("/projects",projectRouter)
app.use("/find-users",findUsersRouter)

server.listen(3000 || process.env.PORT, () => {
  console.log('The server is running on port number 3000');

})


//-------------------------------------------------------