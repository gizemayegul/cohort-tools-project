const { Schema, model } = require("mongoose");
const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedinUrl: {
      type: String,
      default: "",
    },
    languages: [
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Dutch",
      "Other",
    ],
    background: {
      type: String,
      default: "",
    },
    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },
    image: {
      type: String,
      default: "https://i.imgur.com/r8bo8u7.png",
    },
    cohort: {
      type: Schema.Types.ObjectId,
      ref: "Cohort",
    },
    projects: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Student = model("Students", studentSchema);
module.exports = Student;
