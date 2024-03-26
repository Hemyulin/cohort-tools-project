const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: {
		type: String,
	},
	format: { type: String },
	phone: {
		type: Number,
	},
	linkedinUrl: { type: String },
	languages: {
		type: String,
		enum: ["English", "Dutch", "German", "French", "Spanish"],
	},
	program: { type: String },
	background: { type: String },
	image: { type: String },
	cohort: { type: Number },
	projects: { type: Array },
});

const Students = mongoose.model("Students", studentsSchema);

module.exports = Students;
