const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validatePaperInput = require("../../validation/paper");
const validateCommentInput = require("../../validation/comment");

// Load Paper Model
const Paper = require("../../models/Paper");
// Load User Model
const User = require("../../models/User");

// @route   GET api/paper/test
// @desc    Tests paper route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Paper Works" }));

// @route   GET api/paper
// @desc    Get current users paper
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Paper.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(paper => {
        if (!paper) {
          errors.nopaper = "There is no paper for this user";
          return res.status(404).json(errors);
        }
        res.json(paper);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/paper/all
// @desc    Get all papers
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Paper.find()
    .populate("user", ["name", "avatar"])
    .then(papers => {
      if (!papers) {
        errors.nopaper = "There are no papers";
        return res.status(404).json(errors);
      }

      res.json(papers);
    })
    .catch(err => res.status(404).json({ paper: "There are no papers" }));
});

// @route   GET api/paper/handle/:handle
// @desc    Get paper by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Paper.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(paper => {
      if (!paper) {
        errors.nopaper = "There is no paper for this user";
        res.status(404).json(errors);
      }

      res.json(paper);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/paper/user/:user_id
// @desc    Get paper by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Paper.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(paper => {
      if (!paper) {
        errors.nopaper = "There is no paper for this user";
        res.status(404).json(errors);
      }

      res.json(paper);
    })
    .catch(err =>
      res.status(404).json({ paper: "There is no paper for this user" })
    );
});

// @route   POST api/papers
// @desc    Create or edit user paper
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePaperInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const paperFields = {};
    paperFields.user = req.user.id;
    if (req.body.text) paperFields.handle = req.body.text;

    Paper.findOne({ user: req.user.id }).then(paper => {
      if (paper) {
        // Update
        Paper.findOneAndUpdate(
          { user: req.user.id },
          { $set: paperFields },
          { new: true }
        ).then(paper => res.json(paper));
      } else {
        // Create

        // Check if handle exists
        Paper.findOne({ handle: paperFields.handle }).then(paper => {
          if (paper) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Paper
          new Paper(paperFields).save().then(paper => res.json(paper));
        });
      }
    });
  }
);

// @route   POST api/paper/comment
// @desc    Add comment to paper
// @access  Private
router.post(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Paper.findOne({ user: req.user.id }).then(paper => {
      const newComment = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to comment array

      paper.comment.unshift(newComment);

      paper.save().then(paper => res.json(paper));
    });
  }
);

// @route   DELETE api/paper/comment/:exp_id
// @desc    Delete comment from paper
// @access  Private
router.delete(
  "/comment/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Paper.findOne({ user: req.user.id })
      .then(paper => {
        // Get remove index
        const removeIndex = paper.comment
          .map(item => item.id)
          .indexOf(req.params.comment_id);

        // Splice out of array
        paper.comment.splice(removeIndex, 1);

        // Save
        paper.save().then(paper => res.json(paper));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
