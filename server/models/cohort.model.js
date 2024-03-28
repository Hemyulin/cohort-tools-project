const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortsSchema = new Schema({
  cohortSlug: { type: String, unique: true },
  cohortName: { type: Schema.Types.ObjectId, ref: "Student" },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: { type: String, enum: ["Full Time", "Part Time"] },
  campus: {
    type: String,
    enum: [
      "Madrid",
      "Barcelona",
      "Miami",
      "Paris",
      "Berlin",
      "Amsterdam",
      "Lisbon",
      "Remote",
    ],
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  inProgress: { type: Boolean, default: false },
  programManager: { type: String },
  leadTeacher: { type: String },
  totalHours: { type: Number, default: 360 },
});

const Cohort = mongoose.model("Cohort", cohortsSchema);

module.exports = Cohort;
