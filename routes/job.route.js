const express = require("express");
const jobController = require("../controllers/job.controller");
const filecontroller = require("../controllers/fileupload.controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
const uploader = require("../middleware/uploader");

const route = express.Router();

// route.get('/random', getRandomUser)
// route.get('/all', getAllUser)
route.post("/job", jobController.createJob);
route.get("/manager/jobs", verifyToken, jobController.getJobpostByManager);
route.get("/manager/jobs/:id", jobController.getJobDetails);
route.patch("/jobs/:id", jobController.updateJob);
route.post("/job/:id/apply", verifyToken, jobController.applyJob);

route.get("/jobs", jobController.getAllJobsDetails);

module.exports = route;
