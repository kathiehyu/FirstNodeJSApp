const { render } = require("ejs");
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../../models/user");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

router.get('/', (req, res) => {
    console.log("I'm on the start page");
    res.render('home/index');
});

router.get("/home", (req, res) => {
    res.render("home/home");
});

router.get("/about", (req, res) => {
    res.render("home/about");
});

// shows the signup/login page from views
router.get("/login", (req, res) => {
    res.render("home/login");
});


// login
router.post("/login", passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:true
}));

// logout route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
    });
    res.redirect("/home");
});


router.get("/signup", (req, res) => {
    res.render("home/signup");
});

// after user submits, data is posted to /signup page
router.post("/signup", (req, res, next) => {
    // declare the variables
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email}, (err, user) => {
        if (err) return next(err);
        if (user) { // if user exists already
            req.flash("error", "There's already an account with this email.");
            return res.redirect("/signup");
        }
        var newUser = new User({ // else, make a new account
            username:username,
            password:password,
            email:email
        });
        newUser.save(next); // go to next part;
    });
    // what does this do?
}, passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect:"/signup",
    failureFlash:true
}));

// with this information, tell passport to authenticate


module.exports = router;