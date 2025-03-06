// routes/cohort.routes.js

const router = require('express').Router();

const Cohort = require('../models/Cohort.model');

//  POST /api/projects  -  Creates a new student
router.post('/cohorts', (req, res, next) => {

  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours
  } = req.body; 

  Cohort.create({ 
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours
     })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating the cohort", err);
      res.status(500).json({ message: "Error while creating the cohort" });
    });
});

router.get("/cohorts", (req, res, next) => {
    Cohort.find().then((allCohorts)=> {
        res.json({cohorts: allCohorts});
    }).catch((error)=>{
        res.status(500).json({ message: "Error while retrieving all Cohorts"})
    })
  });

  router.put("/cohorts/:id", (req, res, next)=>{
    Cohort.findByIdAndUpdate(req.params.id, req.body).then((updatedCohort) => 
        res.json(updatedCohort)).catch((err) => {
      console.log("Error while updating the cohort", err);
      res.status(500).json({ message: "Error while updating the cohort" });
    });
})

module.exports = router;
