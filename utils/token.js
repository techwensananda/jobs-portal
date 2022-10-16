const jwt = require("jsonwebtoken");

exports.generateToken = (userinfo) => {
  const payload = {
    email: userinfo.email,
    role: userinfo.role,
    id: userinfo._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "20m",
  });
  return token;
};
