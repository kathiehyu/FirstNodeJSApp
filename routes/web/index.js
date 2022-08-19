var express = require("express");
var router = express.Router();

// next: move onto next line
// added currentUser to locals
router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    next();
});

// ^^ that method must be before vv this method

router.use("/", require("./home"));
// when we go to /posts, use this router file
router.use("/posts", require("./post"));

module.exports = router;