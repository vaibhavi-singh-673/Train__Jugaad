const express = require("express");
const router = express.Router({mergeParams : true});
const User = require("../models/user.js")

const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/expresserror.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middlewares.js");
const Booking = require("../models/booking.js");




// user signup

router.get("/user_signup" , (req,res) => {
    res.render("./users/user_signup.ejs");
})

router.post("/user_signup", wrapAsync(async (req,res) => {
    try{
        let {first_name , last_name, username, email, age, password} = req.body;
        const newuser = new User({first_name, last_name,  email, age, username});
        const user = await User.register(newuser, password);
        req.logIn(user , (err) => {
            if (err){
                return next(err);
            }
            req.flash("success" , "Welcome " + first_name);
            res.redirect("/train");
        })
        // req.flash("success" , "Welcome to StayWise");
        // res.redirect("/listings");
    }
    catch (e) {
        req.flash("error" , e.message);
        res.redirect("/user/user_signup");
    }
}))



// user login

router.get("/user_login" , (req,res) => {
    res.render("./users/user_login.ejs");
})

router.post("/user_login" , 
    saveRedirectUrl,
    passport.authenticate(
        "local",
        {
            failureRedirect : "/user/user_login",
            failureFlash : true
        }
    ),
    async (req,res) => {
        req.flash("success" , "Logged in successfully")
        let redirectUrl = res.locals.redirectUrl || "/train";
        res.redirect(redirectUrl);
})




// user logout

router.get("/user_logout", (req,res, next) => {
    req.logOut((err) => {
        if (err){
            return next(err);
        }
        req.flash("success" , "Goodbye user");
        res.redirect("/");
    })
})



// user booking history route

router.get("/history", isLoggedIn , async (req,res) => {
    let bookings = await Booking.find({owner : req.user._id});
    res.render("./users/history.ejs", {bookings});
})

module.exports = router;