const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const ejsMate = require("ejs-mate");
let path = require("path");
const passport = require("passport");
const localStrategy = require("passport-local");
const flash = require("connect-flash");

// require models

const User = require("./models/user.js");

// api station code and name import 

const stations = require("./train_api/stations.js");

// require error modules

const wrapAsync = require("./utils/wrapasync.js");
const ExpressError = require("./utils/expresserror.js");


// routes

const users = require("./routes/user.js");
const trains = require("./routes/train.js");


// server

const app = express();
let port = 8080;



// middlewares


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


const sessionOptions = {
    secret : "supersecret",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + (7*24*60*60*1000),
        maxAge : 7*24*60*60*1000,
        httpOnly : true
    }
};



app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


// mongo connect

const db_url = 'mongodb://127.0.0.1:27017/train_booking';

main()
    .then(
        console.log("successfull")
    )
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(db_url);
}



// routes




// home route

app.get("/", (req,res) => {
    let station = stations;
    res.render("index.ejs" , {station});
})


// user routes

app.use("/user" , users);

// train routes

app.use("/train" , trains);


// error handling

app.all("*" , (req,res,next) => {
    next(new ExpressError(404, "page not found"));
})

app.use((err, req , res, next) => {
    let {statusCode = 500 , message = "Sometghing went wrong"} = err;
    // res.status(statusCode).send(message);
    res.render("error.ejs" , {statusCode, message});
})


// server stqrt

app.listen(port, () =>{
    console.log("HI staywise")
}) 