const express = require("express");
const usercontroller = require("../controllers/user.controller");
const filecontroller = require("../controllers/fileupload.controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
const uploader = require("../middleware/uploader");

const route = express.Router();

// route.get('/random', getRandomUser)
// route.get('/all', getAllUser)
route.post("/register", usercontroller.createUser);
// route.post("/fileupload", uploader.single("cv"), filecontroller.fileUpload);
route.post("/fileupload", uploader.array("cv"), filecontroller.fileUpload);
route.post("/login", usercontroller.loginUser);
route.get("/getme", verifyToken, usercontroller.getme);
route.get(
  "/admin",
  verifyToken,
  authorization("admin", "manager"),
  usercontroller.admin
);
route.get(
  "/admin",
  verifyToken,
  authorization("admin", "manager"),
  usercontroller.admin
);

// route.get('/tours', getAllTour)
// route.get('/tour/trending', getTrendingTours)
// route.get('/tour/cheapest', getCheapestTours)
// route.get('/tours/:id', getTour)
// route.delete('/tours/:id', deleteTour)
// route.patch('/tours/:id', updateTour)
// route.patch('/update/:id', updateUser)
// route.delete('/delete/:id', deleteUser)
// route.patch('/bulk-update', updateBulkUsers)

module.exports = route;
