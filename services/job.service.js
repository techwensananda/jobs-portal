const Job = require("../models/job.model");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token");
const User = require("../models/user.model");

exports.postJobService = async (jobInfo) => {
  const job = await Job.create(jobInfo);
  return job;
};
exports.updateJobService = async (id, jobInfo) => {
  // const job = await Job.create(jobInfo);
  const job = await Job.updateOne({ _id: id }, { $set: jobInfo });
  return job;
};

exports.getJobDetailsService = async (id) => {
  console.log(id);
  const job = await Job.find({ _id: id });
  // console.log(job[0]);
  // console.log(job);
  console.log("mmmmmm");
  const managerInfo = await User.find({ _id: job[0]?.manager?.id });
  return { job, managerInfo };
};
exports.getAllJobDetailsService = async (filters, queries) => {
  console.log(queries);
  const jobs = await Job.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy)
    .skip(queries.skip)
    .limit(queries.limit);

  const totalJobs = await Job.countDocuments(filters);
  const pageCount = await Math.ceil(
    parseInt(totalJobs) / Number(queries.limit)
  );
  console.log(totalJobs, pageCount, queries.limit);
  return { totalJobs, pageCount, jobs };
};
exports.applyJobService = async (id, user, res) => {
  console.log(id, "applyJobService user");
  const jobhh = await Job.findOne({ _id: id });
  console.log(jobhh?.applyCadidates);
  console.log("sdfchljds");

  if (jobhh?.applyCadidates.includes(user?._id)) {
    // console.log("You aleadey applied");
    // return res.status(404).json("You aleadey applied");
    return new Error("You aleadey applied");
  }

  const jobs = await Job.updateOne(
    { _id: id },
    { $push: { applyCadidates: user._id } }
  );
  return jobs;
};

exports.getJobpostByManagerService = async (user) => {
  console.log(user._id, "userid");
  const jobs = await Job.find({});
  console.log("firsttttt");
  // console.log(jobs, user?._id);
  // const yyy = await job.map((jo) => jo.manager.id);
  // console.log(jobs);
  const yyy = jobs.filter((jo) => jo.manager.id == user._id);
  console.log(yyy);
  console.log("firsttttt");
  // const findd = await jobs.filter((items) => items.manager.id == user?._id);

  // const managers = await jobs.map((it) => it.manager.id);
  // console.log(findd);
  // console.log("firsttttt");

  // console.log(user?._id);
  // console.log(jobs);
  return yyy;
};
