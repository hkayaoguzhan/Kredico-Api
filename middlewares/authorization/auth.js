const customError = require("../../helper/error/CustomError");
const jwt = require("jsonwebtoken");
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helper/authorization/tokenHelpers");
const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  if (!isTokenIncluded(req)) {
    return next(new customError("You are not Auth", 401));
  }
  const accessToken = getAccessTokenFromHeader(req);

  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new customError("You are not authorization", 400));
    }
    req.user = {
      id: decoded.id,
      name: decoded.name
    };
    next();
  });
};

module.exports = {
  getAccessToRoute
};
