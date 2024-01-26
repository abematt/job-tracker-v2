require("dotenv").config();

const express = require("express");
const jobRoutes = require("./routes/jobs");
const mongoose = require("mongoose");
const cors = require('cors');


// Create Express App
const app = express();

app.use(cors());

// Middleware
// Gives access to request body
app.use(express.json());

// Logging all Requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Defining Routes
app.use("/api/jobs", jobRoutes);

//Connect to MongoDB Instance
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the MongoDB Instance");
    // Start Listening for Requests After Successful Connection
    app.listen(process.env.PORT, () => {
      console.log("App listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });


