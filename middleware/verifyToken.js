const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  console.log("first");
  try {
    const token = req.headers.authorization.split(" ")?.[1];
    if (!token) {
      return res.status(401).json("You are not login");
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );
    const user = await User.findOne({ email: decoded?.email });
    // console.log(user);
    // console.log("firts");
    const sendUser = user.toObject();
    // req.user = { ...user, _id: user.id };
    // console.log(req.user.toObject());

    req.user = { ...sendUser, _id: decoded.id };
    next();
  } catch (error) {
    return res.status(403).json("Invalid token");
  }
};
