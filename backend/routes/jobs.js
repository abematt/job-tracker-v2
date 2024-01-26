const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
  updateJob,
} = require("../controllers/jobController");

// Create an instance of Express Router
const router = express.Router();

// ********************* GET ALL JOBS ********************* //
router.get("/", getAllJobs);

// ********************* GET JOB BY ID ********************* //
router.get("/:id", getJobById);

// ********************* CREATE JOB ********************* //
router.post("/", createJob);

// ********************* DELETE JOB ********************* //
router.delete("/:id", deleteJob);

// ********************* UPDATE JOB ********************* //
router.patch("/:id", updateJob);

module.exports = router;
