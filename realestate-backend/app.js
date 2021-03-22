// Importing the Packages
var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var path = require('path');
var session = require('express-session')
const passport = require('passport');
const { Strategy } = require('passport-linkedin-oauth2');
const config_var = require("./config/config_var");

global.__basedir = __dirname;
global.backend_url = config_var.backend_url;

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
app.use(cors())
// for parsing multipart/form-data; 
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "Shh, its a secret!", resave: false, saveUninitialized: true, cookie: {} }));
//app.use(upload())  

// Calling the route file for the urls
const propadvisor_routes = require("./routes/path");
const management_routes = require("./management_routes/admin_function");
const admin_function = require("./routes/admin_paths")
const write_review = require("./realstate_projects/write_review");
const post_picture = require("./realstate_projects/post_picture");

const login_process = require("./realstate_projects/login_process");
const login_linkedin = require("./routes/linkedin_login");
//const config_var = require('./config/config_var');
const write_review_location = require("./realstate_projects/write_review_location");
const post_location_picture = require("./realstate_projects/post_location_picture");
const write_review_without_registration = require("./realstate_projects/write_review_without_registration");
const blog = require("./realstate_projects/blog");
const run_python = require("./realstate_projects/run_realestate_python");
const bulk_upload = require("./realstate_projects/bulk_upload");
const most_trending_csv_upload = require("./realstate_projects/most_trending_csv_upoad");

//=============== LINKED-IN LOGIN ==========================

app.use(require('express-session')({ secret: 'choose-a-random-string', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy({
   clientID: config_var.linkedIn_clientID,
   clientSecret: config_var.linkedIn_clientSecret,
   callbackURL: config_var.linkedIn_callbackurl,
   scope: ['r_emailaddress', 'r_liteprofile'],
   state: true
},
   (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
   }));
passport.serializeUser((user, cb) => {
   cb(null, user);
});
passport.deserializeUser((obj, cb) => {
   cb(null, obj);
});
//=========================================

app.use("/", propadvisor_routes);
app.use("/login", login_process); //------- social login --------
app.use("/admin", admin_function);
app.use("/management", management_routes);
app.use("/save_project_review", write_review);
app.use("/write_review_without_registration", write_review_without_registration);
app.use("/save_location_review", write_review_location);
app.use("/post_picture", post_picture);
app.use("/post_location_pictures", post_location_picture);
app.use("/blog", blog);
app.use("/ld", login_linkedin); //----linked-In login ---------------
app.use("/run_python", run_python);
app.use("/bulk_upload", bulk_upload);
app.use("/most_trending_csv_upload", most_trending_csv_upload);

// Setting the host and port for the server
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("App listening at http://%s:%s", host, port)
})
