const userSchema = require("../models/User");
const customError = require("../helper/error/CustomError");
const asyncError = require("express-async-handler");
const { sendJwtToClient } = require("../helper/authorization/tokenHelpers");
const { validateUserInput, comparePassword } = require("../helper/inputHelper/inputHelpers");

const register = asyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await userSchema.create({
    name,
    email,
    password,
    role
  });
  sendJwtToClient(user, res);
});

const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password)) {
    return next(new customError("Please check your inputs", 400));
  }
  const user = await userSchema.findOne({ email }).select("+password");
  if (!user){
    return next(new customError("Email is invalid, user not found"));
  }
  if (!comparePassword(password, user.password)) {
    return next(new customError("PLease check your password", 400));
  }
  sendJwtToClient(user, res);
});

const logout = asyncError(async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true
    })
    .json({
      success: true,
      message: "Logout Success"
    });
});

const getUser = (req, res, next) => {
   res.json({
      success: true,
      data: {
        id: req.user.id,
        name: req.user.name
      }
   });  
};

module.exports = {
  register,
  getUser,
  login,
  logout
};
