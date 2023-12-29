const multer = require("multer");
const { verifyJwtToken } = require("../middleware/auth.js");

// img storage confing
var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("only image is allowd"));
  }
};

var upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});


const movieRoutes = (app) => {
  const auth = verifyJwtToken;

  const movies = require("../controller/movies.controller.js");

  const router = require("express").Router();
  const express = require("express");

  // Create Movie
  router.post("/createmovie",upload.single('image'), movies.createMovie);

  // Get Movie
  router.get("/getmovie", movies.getMovie);

  // Edit Movie
  router.put("/editmovie", movies.editMovie);

  // Delete Movie
  router.delete("/deletemovie", movies.deleteMovie);

  app.use("/api",auth,express.static('upload'), router);
};

module.exports = movieRoutes;
