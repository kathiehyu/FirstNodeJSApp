var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    // json: interchange data btn diff systems
    res.json("This is a json status code for the users api");
});

module.exports = router;