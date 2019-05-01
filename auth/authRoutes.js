require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../data/dbconfig");
const { generateToken } = require("./token-service.js");
const router = express.Router();
const { registerStudent } = require("../data/dbHelpers/studentDb");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  registerStudent(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `${user.username} is logged in`,
          token,
          id: user.id
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  const creds = req.body;
  db("students")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `${user.username} is logged in`,
          token,
          id: user.id
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(() =>
      res.status(500).json({ message: "Please try logging in again." })
    );
});

module.exports = router;
