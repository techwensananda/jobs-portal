const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { ObjectId } = mongoose.Schema.Types;

const managerSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
      required: [true, "Please Provide a Job Title"],
      minLength: [10, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please Provide a Your Last name"],
      minLength: [10, "Description must be at least 10 characters"],
      maxLength: [1000, "Description is too large"],
    },

    deadLine: {
      type: String,
      required: [true, "Deadline is requird"],

      // validate: [validator.isDate, "Please provide a valid Email"],
    },
    location: {
      type: String,
      required: [true, "Loaction is requird"],
    },
    imageURL: {
      type: String,

      validate: [validator.isURL, "Please provide a valid image URL"],
    },
    manager: {
      name: String,

      contactnumber: String,
      id: { type: ObjectId, ref: "User", required: true },
    },
    jobType: {
      type: String,
      enum: {
        values: [
          "Finance Careers",
          "Technology Careers",
          "Marketing Careers",
          "Operations Careers",
          "(HR) Careers",
          "Accounting Careers",
          "Legal Careers",
        ],
        message: "{VALUE} is a not avalid name",
      },
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timeStamps: true,
  }
);

const Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;
