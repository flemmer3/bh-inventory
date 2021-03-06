const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require('express-session');
const passport = require('./passport');

//config
const CONFIG = require("./config.json");
// routes
const user = require('./routes/user');

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/zns";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//sessions
app.use(
    session({
        secret: CONFIG.secret,
        resave: false,
        saveUninitialized: false
    })
);

app.use((req, res, next) => {
    console.log('req.session', req.session);
    return next();
});

//routes
app.use("/user", user);

//passport
app.use(passport.initialize());
app.use(passport.session());

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));