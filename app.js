const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const path = require("path");
const methodOverride = require('method-override');
const ejsmate = require("ejs-mate");
const { listingSchema} = require("./Schema.js");
const ExpressError = require("./utils/ExpressError.js");
var flash = require('connect-flash');
const listingsRouter = require("./routes/listing.js"); 
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const schema = mongoose.schema;
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const passport = require("passport");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));



app.use(session({
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,// for cross scripting attack protection
    }
}));

 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate));

passport.serializeUser(User.serializeUser());
passport.serializeUser(User.deserializeUser());

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust');
}

main().then(() => {
    console.log("Connection to DB successful");
}).catch((err) => {
    console.log("DB connection error:", err);
});

app.listen(port, () => {
    console.log("Server is listening on port", port);
});

// Middleware to validate Listing Schema
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};



app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
     res.locals.error = req.flash("error");
    next();
})

// Express route for listings
app.use("/listings",listingsRouter);

// Express route for Reviews
app.use("/listings/:id/reviews",reviewsRouter)

// Express route for Signup
app.use("/",userRouter);


// 404 Not Found Middleware
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// General Error Handling Middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("errors/err1.ejs", { message });
});