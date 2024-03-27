const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  cohort: Number,
  projects: [String], // Assuming projects is an array of strings
});

module.exports = mongoose.model("Student", StudentSchema);
