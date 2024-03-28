const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

app.use(cors());

// Use the CORS middleware with options to allow requests
// from specific IP addresses and domains.
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173", "http://localhost:5005"],
  })
);

// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Student Routes

// POST /api/students - Creates a new student

// GET /api/students - Retrieves all of the students in the database collection
app.get("/api/students", (req, res) => {
  res.json(students);
});

// GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort

// GET /api/students/:studentId - Retrieves a specific student by id

// PUT /api/students/:studentId - Updates a specific student by id

// DELETE /api/students/:studentId - Deletes a specific student by id

// Cohort Routes

// POST /api/cohorts - Creates a new cohort

// GET /api/cohorts - Retrieves all of the cohorts in the database collection
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id

// PUT /api/cohorts/:cohortId - Updates a specific cohort by id

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
