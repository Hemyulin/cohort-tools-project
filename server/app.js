const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Student = require("./models/students.model");
const Cohort = require("./models/cohort.model");
const cohorts = require("./cohorts.json");
const students = require("./students.json");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

//CRUD COHORTS

app.get("/cohorts", (req, res) => {
	Cohort.find({})
		.then((cohorts) => {
			console.log("Retrieve cohorts ->", cohorts);
			res.json(cohorts);
		})

		.catch((error) => {
			console.error("Error", error);
			res.status(500).json({ error: "Failed to retrived cohorts" });
		});
});

app.post("/cohorts", (req, res) => {
	Cohort.create({
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
		.then((createdBook) => {
			console.log("Cohort created ->", createdBook);
			res.status(201).json(createdBook);
		})
		.catch((error) => {
			console.error("Error while creating the cohort->", error);
			res.status(500).json({ error: "Failed to create the cohort" });
		});
});

app.put("/cohorts/:id", (req, res) => {
	const cohortId = req.params.id;

	Book.findByIdAndUpdate(cohortId, req.body, { new: true })
		.then((updatedCohort) => {
			console.log("Updated cohort ->", updatedCohort);

			res.status(204).json(updatedCohort);
		})
		.catch((error) => {
			console.error("Error while updating the cohort ->", error);
			res.status(500).json({ error: "Failed to update the cohort" });
		});
});

app.delete("/cohorts/:id", (req, res) => {
	Book.findByIdAndDelete(req.params.id)
		.then((res) => {
			console.log("cohort deleted!");
			res.status(204).send(); // Send back only status code 204 indicating that resource is deleted
		})
		.catch((error) => {
			console.error("Error while deleting the cohort ->", error);
			res.status(500).json({ error: "Deleting cohort failed" });
		});
});

//CRUD STUDENTS

app.get("/students", (req, res) => {
	Student.find({})
		.then((students) => {
			console.log("Retrieve students ->", students);
			res.json(students);
		})
		.catch((error) => {
			console.error("Error", error);
			res.status(500).json({ error: "Failed to retrieve students" });
		});
});

app.post("/students", (req, res) => {
	Cohort.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		format: req.body.format,
		linkedinUrl: req.body.linkedinUrl,
		languages: req.body.languages,
		program: req.body.program,
		background: req.body.background,
		image: req.body.image,
		cohortr: req.body.cohort,
		projects: req.body.projects,
	})
		.then((createdBook) => {
			console.log("student created ->", createdBook);
			res.status(201).json(createdBook);
		})
		.catch((error) => {
			console.error("Error while creating the student ->", error);
			res.status(500).json({ error: "Failed to create the student" });
		});
});

app.put("/students/:id", (req, res) => {
	const studentId = req.params.id;

	Book.findByIdAndUpdate(studentId, req.body, { new: true })
		.then((updatedStudent) => {
			console.log("Updated book ->", updatedStudent);

			res.status(204).json(updatedStudent);
		})
		.catch((error) => {
			console.error("Error while updating the student ->", error);
			res.status(500).json({ error: "Failed to update the student" });
		});
});

app.delete("/students/:id", (req, res) => {
	Book.findByIdAndDelete(req.params.id)
		.then((res) => {
			console.log("student deleted!");
			res.status(204).send(); // Send back only status code 204 indicating that resource is deleted
		})
		.catch((error) => {
			console.error("Error while deleting the student ->", error);
			res.status(500).json({ error: "Deleting student failed" });
		});
});

// MIDDLEWARE
// Research Team - Set up CORS middleware here:

app.use(cors());
// Use the cors middleware without any options to allow
// requests from any IP address and domain.

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

app.get("/api/cohorts", (req, res) => {
	res.json(cohorts);
});

app.get("/api/students", (req, res) => {
	res.json(students);
});

// START SERVER
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

//CONNECT WITH MONGOOSE

mongoose
	.connect("mongodb://127.0.0.1:27017/mongoose-intro-dev")
	.then((x) =>
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
	)
	.catch((err) => console.error("Error connecting to mongo", err));
