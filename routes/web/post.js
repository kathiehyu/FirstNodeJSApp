var express = require("express");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;
var router = express.Router();
var Post = require("../../models/post");

router.use(ensureAuthenticated);

// to secure route: use middleware, which authenticates
// before accessing route.
router.get("/", (req, res) => {
	// get data (all posts)
	Post.find({userID:req.user._id}).exec((err, posts) => {
		if (err) console.log(err);
		// second param, post data
		res.render("post/posts", {posts:posts});
	});
});

router.get("/add", (req, res) => {
	res.render("post/addpost");
});

router.post("/add", (req, res) => {
	var newPost = new Post({
		title: req.body.title,
		content: req.body.content,
		userID: req.user._id
	});
	// save post to database
	newPost.save((err, post) => {
		if (err) console.log(err);
		res.redirect("/posts");
	});
});

module.exports = router;