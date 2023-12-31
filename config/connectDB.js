const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URI = "mongodb+srv://shubhampal:shubham1996@moviedetails.m0f1lfa.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb is Successfully Connected");
  } catch (err) {
    console.error(err.message);
    //exit from the process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
