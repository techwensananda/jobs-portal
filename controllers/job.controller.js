const {
  postJobService,
  updateJobService,
  getJobDetailsService,
  getAllJobDetailsService,
  applyJobService,
  getJobpostByManagerService,
} = require("../services/job.service");

exports.createJob = async (req, res, next) => {
  try {
    const result = await postJobService(req.body);
    console.log(result, "result");
    res.status(200).json({
      status: "success",
      message: "Successfully post the Job",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't posst  the Job",
      message: error.message,
    });
  }
};
exports.updateJob = async (req, res, next) => {
  try {
    const result = await updateJobService(req.params.id, req.body);
    console.log(result, "result");
    res.status(200).json({
      status: "success",
      message: "Successfully post the Job",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't posst  the Job",
      message: error.message,
    });
  }
};
exports.getJobDetails = async (req, res, next) => {
  try {
    const result = await getJobDetailsService(req.params.id);

    res.status(200).json({
      status: "success",
      data: result,
      message: "Successfully post the Job",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't posst  the Job",
      message: error.message,
    });
  }
};
exports.getAllJobsDetails = async (req, res, next) => {
  try {
    const filters = { ...req.query };
    const queries = {};

    const excludeFields = ["sort", "page", "limit"];

    excludeFields.forEach((field) => delete filters[field]);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");

      queries.sortBy = sortBy;
    }

    if (req.query) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * Number(limit);
      queries.skip = skip;
      queries.limit = Number(limit);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");

      queries.fields = fields;
    }
    // const tours = await getToursService(filters, queries)

    const result = await getAllJobDetailsService(filters, queries);
    console.log(result, "result");
    res.status(200).json({
      status: "success",
      data: result,
      message: "Successfully post the Job",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't posst  the Job",
      message: error.message,
    });
  }
};

exports.applyJob = async (req, res, next) => {
  try {
    const result = await applyJobService(req.params.id, req.user, res);
    console.log(result);
    if (result?.modifiedCount) {
      res.status(200).json({
        status: "success",
        data: result,
        message: "Successfully Apply the Job",
      });
    }
    return res.status(404).json("You have already applied");
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't Apply  the Job",
      message: error.message,
    });
  }
};

// ??manager
exports.getJobpostByManager = async (req, res, next) => {
  // console.log(req.user?._id, "id of job");
  // console.log("dklcnlk");
  // console.log(req.user);
  // console.log("req.user");
  try {
    const result = await getJobpostByManagerService(req.user);
    // console.log(result);

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "couldn't Apply  the Job",
      message: error.message,
    });
  }
};
