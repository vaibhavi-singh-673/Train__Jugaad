// const Listing = require("./models/listing.js");
// const Review = require("./models/review.js");
const ExpressError = require("./utils/expresserror.js");

// const {listingSchema} = require("./schema.js");
// const {reviewSchema} = require("./schema.js");



// middleware
// module.exports.validateListing = (req, res , next) => {
//     let {error } = listingSchema.validate(req.body);
//     if (error){
//         let err = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400 , err);
//     }
//     else{
//         next();
//     }
// }



// middlewares


// module.exports.validateReview = (req, res , next) => {
//     let {error } = reviewSchema.validate(req.body);
//     if (error){
//         let err = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400 , err);
//     }
//     else{
//         next();
//     }
// }




module.exports.isLoggedIn = (req,res, next) => {
    if (!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You are not logged in");
        return res.redirect("/user/user_login");
    }
    next();
}


module.exports.saveRedirectUrl = (req,res,next) => {
    if (req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}