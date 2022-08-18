console.log("hello world")
var path = require("path");
// var routes = require("./routing");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var params = require("./params/params");
var setUpPassport = require("./setuppassport");
const exp = require('express'); // write out full variable? no need
const app = exp();

/*
require() == import modules
can also do import/export

!! Ready? button doesn't work when accessing from local host, but does when
opening html file directly; i suspect it's because leaning doesn't have acceess
to buttons.html file, where Ready? is created
*/

// connect to database
mongoose.connect(params.DATABASECONNECTION);
setUpPassport();

// model: representnation of databse

//create
const { EventEmitter } = require('events'); // has to be "events"
const eventEmitter = new EventEmitter(); // EventEmitter API? learn it

//handle; lambda statement
eventEmitter.on("thisAction", () => {
    console.log("HELLO WORLD!!! ");
});

eventEmitter.emit("thisAction");
eventEmitter.emit("someAction"); // this does nothing

//reading a file, async, non-blocking
// const {readFile, readFileSync, read } = require('fs'); //imported these functions from File system module

// //blocking
// const txt = readFileSync("./sample.txt", "utf-8"); // . is current directory
// console.log(txt);
// console.log("what");

// // non blocking
// // callback function: error if it fails, text if it's successful
// readFile('./sample.txt', 'utf-8', (err, txt) => {
//     console.log(txt);
// })
// console.log("here");

// promise-based
const { readFile } = require('fs').promises; // importing readFile from promises namespace

/*
// await to resolve promise but can only be used in async functions
// await waits for a promise to be fulfilled (or rejected) before function can be executed
// when execution resumes, value of await expression is value of the resolved promise or rejected value
async function method() {  // function that returns a promise when called
    const file = await readFile('./sample.txt', 'utf-8');
    return file;
}
console.log(method()); //why is the promise pending?
*/

// modules
const myModule = require("./newModule.js");
console.log(myModule);

// node package manager (npm): use other people's code

/* url, callback function: request: event; handle that event w a response function
// app.get('/', async (request, response) => { // can do req, res
    // response.send(await readFile('./test.html', 'utf-8')); // send reponse (html file) back to user
// });
tell express to listen for incoming requests. define a port, usually node environment variable
local host 3000 
app.listen(process.env.PORT || 3000, () => console.log("link: http://localhost:3000"));
*/

//same as
app.set('port', process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// bodyParser: in order to fetch body objects from filling form
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"secreteCodethAtnoboDycanGuESs",
    resave:false,
    saveUninitialized:false
}));

// passport: module to authenticate
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.listen(app.get('port'), () => {
    console.log("server started on: " + app.get('port'));
    console.log("link: http://localhost:3000");
});