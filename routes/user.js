const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport"); // Now you can require it here
const { saveRedirectUrl } = require("../middleware.js");
const { showSignupForm , signup , loginForm ,login , logout} = require("../controller/user.js");




// GET route to show the signup form
router.get("/signup", showSignupForm );

// POST route to handle user registration
router.post(
  "/signup",
  wrapAsync(signup),
);

// GET route to show the login form
router.get("/login", loginForm);

// POST route to handle login (your code, which will now work)
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
 login
);

// GET route for logout
router.get("/logout", logout);




module.exports = router;
