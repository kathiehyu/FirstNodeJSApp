var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var User = require("./models/user");
module.exports = function() {
    // turns user object into id
    passport.serializeUser((user, done) => {
        //serializing the user
        done(null, user._id);
    });

    // turns id into user object
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    // strategy, way to log in
    passport.use("login", new localStrategy ({
        usernameField:"email",
        passwordField:"password"
    }, (email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, {message: "No user has that email!"});
            user.checkPassword(password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) return done(null, user);
                else return done(null, false, {message:"Invalid password"});
            });
        });
    }));
}