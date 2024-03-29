const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const StudentModel = require("./models/students.model-temp");
const CohortModel = require("./models/cohort.model");

// DONE Connect to Mongoose

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5005"],
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// StudentModel Routes

// DONE AND WORKING! POST /api/students - Creates a new student
app.post("/api/students", (req, res) => {
  StudentModel.create(req.body)
    .populate("cohort")
    .then((newStudent) => {
      res.status(201).json(newStudent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DONE AND WORKING! GET /api/students - Retrieves all of the students in the database collection
app.get("/api/students", (req, res) => {
  StudentModel.find()
    .populate("cohort")
    .then((students) => {
      console.log(students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error retrieving students:", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

// DONE AND WORKING! GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;

  StudentModel.find({ cohort: cohortId })
    .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      console.log("Error retrieving students for cohort", error);
      res.status(500).json({ error: "Failed to retrieve students for cohort" });
    });
});

// DONE AND WORKING! GET /api/students/:studentId - Retrieves a specific student by id
app.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  StudentModel.findById(studentId)
    .populate("cohort")
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: "Student not found!" });
      }
      res.status(200).json(student);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve the student" });
    });
});

// DONE AND WORKING! PUT /api/students/:studentId - Updates a specific student by id
app.put("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  StudentModel.findByIdAndUpdate(studentId, req.body, { new: true })
    .populate("cohort")
    .then((updatedStudent) => {
      if (!updatedStudent) {
        return res.status(500).json({ error: "Student not found" });
      }
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      console.log("Error updating student", error);
      res.status(500).json({ error: "Failed to update student" });
    });
});

// DONE AND WORKING! DELETE /api/students/:studentId - Deletes a specific student by id
app.delete("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  StudentModel.findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      if (!deletedStudent) {
        return res.status(404).json({ error: "Student does not exist!" });
      }
      console.log("Student deleteed");
      res.status(204).end();
    })
    .catch((err) => {
      console.error("Error whil deleting a student", err);
      res.status(500).json({ error: "Deleted student failed" });
    });
});

// CohortModel Routes

// DONE AND WORKING! POST /api/cohorts - Creates a new cohort
app.post("/api/cohorts", (req, res) => {
  CohortModel.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((createCohort) => {
      console.log("CohortModel created ->", createCohort);
      res.status(201).json(createCohort);
    })
    .catch((error) => {
      console.error("Error while creating the cohort->", error);
      res.status(500).json({ error: "Failed to create the cohort" });
    });
});

// DONE AND WORKING! GET /api/cohorts - Retrieves all of the cohorts in the database collection
app.get("/api/cohorts", (req, res) => {
  CohortModel.find()
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((err) => {
      console.log(err);
    });
});

// DONE AND WORKING! GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
app.get("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  CohortModel.findById(cohortId)
    .then((cohort) => {
      if (!cohort) {
        return res.status(404).json({ error: "The cohort doesn't exist!" });
      }
      res.status(200).json(cohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve cohort" });
    });
});

// DONE AND WORKING! PUT /api/cohorts/:cohortId - Updates a specific cohort by id
app.put("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  const updatedCohortData = req.body;

  CohortModel.findByIdAndUpdate(cohortId, updatedCohortData, { new: true })
    .then((updatedCohort) => {
      if (!updatedCohort) {
        return res.status(404).json({ error: "Cohort not found!" });
      }
      res.status(200).json(updatedCohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Cohort could not be updated!" });
    });
});

// DONE AND WORKING! DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
app.delete("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  CohortModel.findByIdAndDelete(cohortId)
    .then((cohort) => {
      if (!cohort) {
        return res.status(404).json({ error: "The cohort doesn't exist!" });
      }
      console.log("Student deleted!");
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Couldn't delete cohort" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
