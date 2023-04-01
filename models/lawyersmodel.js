const mongoose = require("mongoose");
const lawyersschema = new mongoose.Schema(
  {
    userId:
    {

      type:String,
      required:true,
    },
    firstname: {
      type: String,
      requireed: true,
    },
    lastname: {
      type: String,
      requireed: true,
    },

    city: {
      type: String,
      requireed: true,
    },

    phonenumber: {
      type: Number,
      requireed: true,
    },
    qualification: {
      type: String,
      requireed: true,
    },
    experience: {
      type: String,
      requireed: true,
    },
    fees: {
      type: String,
      requireed: true,
    },
    address: {
      type: String,
      requireed: true,
    },
    image: {
      type: String,
      requireed: true,
    },

    timings: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const lawyersmodel = mongoose.model("lawyers", lawyersschema);
module.exports = lawyersmodel;
        
        
        
        
        
