const Job = require("../models/jobModel");
const mongoose = require("mongoose");

// ********************* GET ALL JOBS ********************* //
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({}).sort({ createdAt: -1 });

  res.status(200).json({ jobs });
};

// ********************* GET JOB BY ID ********************* //
const getJobById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ Error: "No such Job" });
  try {
    const job = await Job.findById(id);
    res.status(200).json({ job });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ********************* CREATE JOB ********************* //
const createJob = async (req, res) => {
  const { companyName, position, appliedDate, status, responseDate } = req.body;

  // Add job to the database
  try {
    const job = await Job.create({
      companyName,
      position,
      appliedDate,
      status,
      responseDate,
    });
    res.status(200).json({ job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ********************* DELETE JOB ********************* //
const deleteJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ Error: "No such Job" });
  try {
    const job = await Job.findOneAndDelete({ _id: id });
    res.status(200).json({ job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ********************* UPDATE JOB ********************* //
const updateJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ Error: "No such Job" });

  try {
    const job = await Job.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    res.status(200).json({ job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createJob, getAllJobs, getJobById, deleteJob, updateJob };