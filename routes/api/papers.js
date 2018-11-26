const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Paper = require("../../models/Paper");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validatePaperInput = require("../../validation/paper");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Paper Works" }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Paper.find()
    .sort({ date: -1 })
    .then(papers => res.json(papers))
    .catch(err => res.status(404).json({ nopapersfound: "No paper found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Paper.findById(req.params.id)
    .then(paper => {
      if (paper) {
        res.json(paper);
      } else {
        res.status(404).json({ nopaperfound: "No paper found with that ID" });
      }
    })
    .catch(err =>
      res.status(404).json({ nopaperfound: "No paper found with that ID" })
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPaper = new Paper({
      handle: req.body.handle,
      uploader: req.body.uploader,
      filePath: req.body.filePath,
      user: req.user.id,
      fileName: req.body.fileName
    });

    newPaper.save().then(paper => res.json(paper));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Paper.findById(req.params.id)
        .then(paper => {
          // Check for post owner
          if (paper.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          paper.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ papernotfound: "No paper found" })
        );
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Paper.findById(req.params.id)
        .then(paper => {
          if (
            paper.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          paper.likes.unshift({ user: req.user.id });

          paper.save().then(post => res.json(paper));
        })
        .catch(err =>
          res.status(404).json({ papernotfound: "No paper found" })
        );
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Paper.findById(req.params.id)
        .then(paper => {
          if (
            paper.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = paper.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          paper.likes.splice(removeIndex, 1);

          // Save
          paper.save().then(paper => res.json(paper));
        })
        .catch(err =>
          res.status(404).json({ papernotfound: "No paper found" })
        );
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Paper.findById(req.params.id)
      .then(paper => {
        const newComment = {
          handle: req.body.handle,
          uploader: req.body.uploader,
          filePath: req.body.filePath,
          user: req.user.id,
          fileName: req.body.fileName
        };

        // Add to comments array
        paper.comments.unshift(newComment);

        // Save
        paper.save().then(paper => res.json(paper));
      })
      .catch(err => res.status(404).json({ papernotfound: "No paper found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Paper.findById(req.params.id)
      .then(paper => {
        // Check to see if comment exists
        if (
          paper.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = paper.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        paper.comments.splice(removeIndex, 1);

        paper.save().then(paper => res.json(paper));
      })
      .catch(err => res.status(404).json({ papernotfound: "No paper found" }));
  }
);

module.exports = router;
