const jwt = require("jsonwebtoken");

// Token generation

exports.generateJwtToken = (Id) => {
  const payload = {
    id: Id,
    msg: "token_generated",
  };
  const token = jwt.sign(payload, "the-super-strong-secrect", {
    expiresIn: "10h",
  });

  return token;
};
