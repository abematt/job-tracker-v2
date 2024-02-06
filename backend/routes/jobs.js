const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
  updateJob,
  countJobs,
} = require("../controllers/jobController");

// Create an instance of Express Router
const router = express.Router();

router.use(requireAuth);

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

router.get("/stats/all", countJobs);

module.exports = router;
