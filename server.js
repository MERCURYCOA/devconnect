const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
<<<<<<< HEAD
const uploader = require("./routes/api/uploader");
=======
// const pasts = require("./routes/api/pasts");
const paper = require("./routes/api/paper");
>>>>>>> f96d156021edcf4b6ff15af47f4f066d193358ee

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
<<<<<<< HEAD
app.use("/api/uploader", uploader);
=======
// app.use("/api/pasts", pasts);
app.use("/api/paper", paper);
>>>>>>> f96d156021edcf4b6ff15af47f4f066d193358ee

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // app.use(express.static('client/build'));
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
