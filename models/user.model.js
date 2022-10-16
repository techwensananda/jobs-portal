const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please Provide a Your First name"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please Provide a Your Last name"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },

    email: {
      type: String,
      required: [true, "Email is requird"],
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid Email"],
    },
    contactNumber: {
      type: String,
      required: [true, "number is requird"],

      validate: [validator.isMobilePhone, "Please provide a valid Number"],
    },
    imageURL: {
      type: String,

      validate: [validator.isURL, "Please provide a valid image URL"],
    },

    password: {
      type: String,
      required: [true, "Password is requird"],

      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
    },
    confirmPassword: {
      type: String,

      validate: {
        validator: function (value) {
          return value == this.password;
        },
        message: "Password don't match.",
      },
    },

    location: String,
    role: {
      type: String,

      enum: ["candidate", "admin", "manager"],
      default: "candidate",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
  },
  {
    timeStamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashPassword = bcrypt.hashSync(password);
  this.confirmPassword = undefined;
  this.password = hashPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
