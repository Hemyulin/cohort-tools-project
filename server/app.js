const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5005;
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const cors = require("cors");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

app.use(cors());

app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173", "http://localhost:5005"],
  })
);

// ...27017
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

app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.get("/api/students", (req, res) => {
  res.json(students);
  console.log("api/students route ahoy");
});

// Student Routes

// POST /api/students - Creates a new student

// GET /api/students - Retrieves all of the students in the database collection

// GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort

// GET /api/students/:studentId - Retrieves a specific student by id

// PUT /api/students/:studentId - Updates a specific student by id

// DELETE /api/students/:studentId - Deletes a specific student by id

// Cohort Routes

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
