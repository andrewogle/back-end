require('dotenv').config();
const express = require("express");
const { getStudentById, getAllStudents } = require("../data/dbHelpers/studentDb.js");
const router = express.Router();
const { authenticate } = require('../auth/authenticate.js');

router.get("/students", authenticate, async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500), json(error);
  }
});

router.get("/students/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const students = await getStudentById(id);
    if (students) {
      res.status(200).json(students);
    } else {
      res
        .status(404)
        .json({ message: "The specified student does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Student information could not be retrieved." });
  }
});



module.exports = router;
