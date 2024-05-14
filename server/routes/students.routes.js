const Student = require("../models/Student.model");
const express = require("express");

const studentRouter = express.Router();

studentRouter.get("/api/students", (req, res) => {
  Student.find()
    .populate("Cohort")
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});
studentRouter.post("/api/students", (req, res) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl || "",
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background || "",
    image: req.body.image || "https://i.imgur.com/r8bo8u7.png",
    Cohort: req.body.Cohort,
    project: req.body.project,
  })
    .then((response) => {
      res
        .status(200)
        .json({ message: "succesfully created", response: response });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});
studentRouter.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Student.find({ Cohort: cohortId })
    .populate("Cohort")
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});
studentRouter.get("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .populate("Cohort")
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});
studentRouter.put("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  console.log(studentId);
  Student.findByIdAndUpdate(
    studentId,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl || "",
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background || "",
      image: req.body.image || "https://i.imgur.com/r8bo8u7.png",
      Cohort: req.body.Cohort,
      project: req.body.project,
    },
    { new: true }
  )
    .then((response) => {
      res
        .status(200)
        .json({ message: "succesfully updated", response: response });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});

studentRouter.delete("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId)
    .then((response) => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});
module.exports = studentRouter;
