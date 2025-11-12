const express = require("express");
const router = express.Router({mergeParams:true});
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

//Register Routes

//Renders register page
router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
})



router.post("/signup",wrapAsync(async(req,res)=>{
try{
 let {username,email,password} = req.body;
const newUser = new User({email,username});
const registeredUser =  await User.register(newUser,password);
req.flash("success","Welcome to wanderlust!");
res.redirect("/listings");
}
catch (e){
    req.flash("error",e.message);
    res.redirect("/signup");
}

} )  )

//Login routes

router.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
})



router.post(
    "/login",
    passport.authenticate("local"
    , { failureRedirect: '/login',failureFlash:true })
    ,wrapAsync(async(req,res)=>{

    req.flash("success","Welcome to wanderlust! You are logged in");
    res.redirect("/listings");
}))

module.exports = router;