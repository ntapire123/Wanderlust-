const express = require("express");
const app = express();
const users = require("./routes/user.js");
const post = require("./routes/post.js");
var session = require("express-session");
var flash = require('connect-flash');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set('trust proxy', 1)
const sessionoptions = session({
    secret: "mysupersicreatstring",
    resave: false,
    saveUninitialized: true,

})
// trust first proxy
app.use(sessionoptions);

app.get("/register", (req,res) =>{
    let {name = "Annonymus"} = req.query;
    req.session.name = name;
    req.flash("Success","user registered successfullly");
    res.send(name);
})
app.get("/reqcount",(req,res)=>{

    if(req.session.count){
        req.session.count++
    }
    else{
req.session.count = 1;
    }
    
    
    res.send(`You send the request ${req.session.count} times`);
})


app.listen(8080,()=>{
    console.log(("server is listening to 8080"));
})
