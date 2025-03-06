// routes/students.routes.js

const router = require('express').Router();

const Student = require('../models/Student.model');

router.get("/students", (req, res, next) => {
    Student.find().then((allStudents)=> {
        res.json({students: allStudents});
    }).catch((error)=>{
        res.status(500).json({ message: "Error while retrieving all Students"})
    })
  });

//  POST /students  -  Creates a new student
router.post('/students', (req, res, next) => {

  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    // languages: [],
    program,
    background,
    image,
    cohort,
    // projects: []
  } = req.body; 

  Student.create({ 
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    program,
    background,
    image,
    cohort
     })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating the project", err);
      res.status(500).json({ message: "Error while creating the student doc" });
    });
});

router.put("/students/:id", (req, res, next)=>{
    Student.findByIdAndUpdate(req.params.id, req.body).then((updatedStudent) => 
        res.json(updatedStudent)).catch((err) => {
      console.log("Error while updating the student", err);
      res.status(500).json({ message: "Error while updating the student" });
    });
})

module.exports = router;
