const User = require("../model/User");
const MoviesList = require("../model/MoviesList");

const bcrypt = require("bcryptjs");

const { generateJwtToken } = require("../helper/generateJwtToken");

// Register APIs

exports.register = async (req, res) => {
  const r = req.body;

  // Encrypt Password
  const salt = await bcrypt.genSalt(10);
  const encryptPass = await bcrypt.hash(r.password, salt);

  r.password = encryptPass;

  User.create(r)
    .then((data) => {
      res.send({
        message: "User Created",
      });
    })
    .catch((err) => {
      res.send({
        message: err.message,
      });
    });
};

// Login APIs

exports.login = async (req, res) => {
  const r = req.body;

  // Encrypt Password
  User.find({ email: r.email })
    .then((data) => {
      // Decrypt Password
      const result = bcrypt.compareSync(r.password, data[0].password);
      // If true password matched if false not match

      if (result === true) {
        // generate jwt token here and add in response

        const Id = data[0]._id.valueOf();
        const tokenResp = generateJwtToken(Id);

        res.send({
          message: "Login Successfully",
          token: tokenResp,
        });
      } else {
        res.send({
          message: "Password is incorrect",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Email id is incorrect",
      });
    });
};

// Create Movie APIs

exports.createMovie = async (req, res) => {
  const r = req.body;

  const { filename } = req.file;

  r.movieimage = filename ? filename : "https://shorturl.at/bioD4";

  console.log("Check_resposne1:", r);

  MoviesList.find({ moviename: r.moviename })
    .then((data) => {
      if (data.length > 0) {
        res.send({
          message: "Movie already present",
        });
      } else {
        MoviesList.create(r)
          .then((data) => {
            res.send({
              message: "Movie Created Successfuly",
            });
          })
          .catch((err) => {
            res.send({
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.send({
        message: err.message,
      });
    });
};

// Get All Movies APIs

exports.getMovie = async (req, res) => {
  MoviesList.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

// Edit Movies

exports.editMovie = async (req, res) => {
  const r = req.body;
  if (r.id) {
    MoviesList.findOneAndUpdate({ _id: r.id }, r)
      .then((data) => {
        res.send({
          message: "Movie updated successfully",
        });
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send({
      message: "Please provide movie id",
    });
  }
};

// Delete Movie

exports.deleteMovie = async (req, res) => {
  const r = req.body;
  if (r.id) {
    MoviesList.findByIdAndRemove(r.id)
      .then((data) => {
        data === null
          ? res.send({
              message: "Movie already deleted",
            })
          : res.send({
              message: "Movie deleted successfully",
            });
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send({
      message: "Please provide movie id",
    });
  }
};
