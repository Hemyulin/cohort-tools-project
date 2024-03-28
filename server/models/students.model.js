const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  cohort: String,
  projects: [String],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
