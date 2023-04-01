const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    isadmin: {
      type: Boolean,
      default: false,
    },
    islawyer: {
      type: Boolean,
      default: false,
    },
    unseennotifications: {
      type: Array,
      default: [],
    },
    seennotifications: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const usermodels = mongoose.model("users", usersSchema);
module.exports = usermodels;
