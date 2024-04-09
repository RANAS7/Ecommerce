const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};
exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDdhMWJiMzI2OGE3MDNhNTBiYjhkYyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjU3NzE0OX0.ezX9YEKsOgob60mGNNywneobi8Aa5Plfw4CZgTo94i8";
  return token;
};
