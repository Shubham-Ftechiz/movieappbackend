const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  moviename: {
    type: String,
    required: true,
  },
  publishedyear: {
    type: String,
    required: true,
  },
  movieimage: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = MoviesList = mongoose.model("movie", MovieSchema); // table or collection name
