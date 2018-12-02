const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validatePaperInput = require("../../validation/paper");
const validateCommentInput = require("../../validation/comment");
const validateEducationInput = require("../../validation/education");

// Load Paper Model
const Paper = require("../../models/Paper");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Paper Works" }));

// @route   GET api/profile
// @desc    Get current users profile
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

// @route   GET api/profile/all
// @desc    Get all profiles
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

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
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

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
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
    if (req.body.handle) paperFields.handle = req.body.handle;
    if (req.body.company) paperFields.company = req.body.company;
    if (req.body.website) paperFields.website = req.body.website;
    if (req.body.location) paperFields.location = req.body.location;
    if (req.body.bio) paperFields.bio = req.body.bio;
    if (req.body.status) paperFields.status = req.body.status;
    if (req.body.githubusername)
      paperFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      paperFields.skills = req.body.skills.split(",");
    }

    // Social
    paperFields.social = {};
    if (req.body.youtube) paperFields.social.youtube = req.body.youtube;
    if (req.body.twitter) paperFields.social.twitter = req.body.twitter;
    if (req.body.facebook) paperFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) paperFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) paperFields.social.instagram = req.body.instagram;

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

          // Save Profile
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

      // paper.comment.unshift(newComment);
      paper.comment.unshift(newComment);

      paper.save().then(paper => res.json(paper));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to edu array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
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

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Paper.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
