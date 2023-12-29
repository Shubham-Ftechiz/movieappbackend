const { verifyJwtToken } = require("../middleware/auth.js");

const loginRegister = (app) => {
  const auth = verifyJwtToken;

  const movies = require("../controller/movies.controller.js");

  const router = require("express").Router();

  // Register Route
  router.post("/register", movies.register);

  // Login Route
  router.post("/login", movies.login);

  app.use("/api", router);
};

module.exports = loginRegister;
