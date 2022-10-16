const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token");

exports.signupService = async (userinfo) => {
  const user = await User.create(userinfo);
  return user;
};
exports.logiService = async (userinfo) => {
  const { email, password } = userinfo;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json("user not found");
  }

  const comaprePassword = bcrypt.compareSync(password, user.password);
  if (!comaprePassword) {
    return res.status(404).json("Wrong username or password");
  }
  const token = generateToken(user);
  const { password: pwd, status, ...others } = user.toObject();

  return { ...others, token };
};
