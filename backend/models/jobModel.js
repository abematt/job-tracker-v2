const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  appliedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  responseDate: {
    type: Date,
    required: false,
  },
},{timestamps:true});

module.exports = mongoose.model("Joblist", jobSchema);
