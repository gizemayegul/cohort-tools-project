const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const mongoose = require("mongoose");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const students = require("./students.json");
const cohorts = require("./cohorts.json");
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//DATABASE

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

//COHORTS ROUTES

app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Cohort.findById(cohortId)
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});
app.put("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndUpdate(
    cohortId,
    {
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      endDate: req.body.endDate,
      program: req.body.program,
      programManager: req.body.programManager || "",
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
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
app.post("/api/cohorts", (req, res) => {
  Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    endDate: req.body.endDate,
    program: req.body.program,
    programManager: req.body.programManager || "",
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
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

app.delete("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndDelete(cohortId)
    .then((response) => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});

//
//STUDENTS ROUTES
//
app.get("/api/students", (req, res) => {
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
app.post("/api/students", (req, res) => {
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
app.get("/api/students/cohort/:cohortId", (req, res) => {
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
app.get("/api/students/:studentId", (req, res) => {
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
app.put("/api/students/:studentId", (req, res) => {
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

app.delete("/api/students/:studentId", (req, res) => {
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

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
