// // representation of model user: Schema

// // bcrypt: hash passwords, compare hashed passwords
// var bcrypt = require("bcryptjs");

// var mongoose = require("mongoose");

// const SALT_FACTOR = 10;

// var userSchema = mongoose.Schema({
//     username:{type:String, required:true},
//     email:{type:String, required:true, unique:true},
//     password:{type:String, required:false},
//     createdAt:{type:Date, default:Date.now}
// });
// // right before it saves
// userSchema.pre("save", function(done) {
//     var user = this;

//     // changing the password?
//     if (!user.isModified("password")) {
//         return done();
//     }

//     // generate salt: random string to make hash unpredictable
//     bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
//         if (err) return done(err);
//         bcrypt.hash(user.password, salt, (err, hashedPassword) => {
//             if (err) return done(err);
//             user.password = hashedPassword;
//             done();
//         });
//     });
// });

// // check password after attempting to login: 
// userSchema.methods.checkPassword = (guess, done) => {
//     if (this.password != null) {
//         // compare password supplied (guess) with actual hashedPassword in db
//         bcrypt.compare(guess, this.password, (err, isMatch) => {
//             done(err, isMatch);
//         });
//     }
// }

// var User = mongoose.model("User", userSchema);
// module.exports = User;
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");

const SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:false},
    createdAt:{type:Date, default:Date.now}
});

userSchema.pre("save", function(done){
    var user = this;

    if(!user.isModified("password")){
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err,salt){
        if(err){return done(err);}
        bcrypt.hash(user.password, salt, function(err, hashedPassword){
            if(err) {return done(err);}
            user.password = hashedPassword;
            done();
        });
    });

});

userSchema.methods.checkPassword = function(guess, done){
      if(this.password != null){
          bcrypt.compare(guess,this.password, function(err, isMatch){
             done(err, isMatch);
          });
      }
}

var User = mongoose.model("User", userSchema);

module.exports = User;