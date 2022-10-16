module.exports = (...role) => {
  return (req, res, next) => {
    console.log(role);
    const userRole = req.user.role;
    // console.log(userRole);
    if (!role.includes(userRole)) {
      return res.status(401).json("You are not Authrizes");
    }
    next();
  };
};
