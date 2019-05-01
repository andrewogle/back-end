const db = require("../dbconfig.js");

const getStudent = async student => {
  const [id] = await db("students").insert(student);
  return db("students")
    .where({ id })
    .first();
}
const getStudentById = id => {
  return db("students")
    .join("schools", { "schools.id": "students.school_id" })
    .join("threads", { "threads.student_id": "students.id" })
    .join("bubl", { "bubl.id": "threads.bubl_id" })
    .where({ "students.id": id })
    .first();
}

const getAllStudents = () => {
  return db("students")
    .join("schools", { "schools.id": "students.school_id" })
}

const registerStudent = (student) => {
  const id = db('students').insert(student);
  return getStudentById(id);
}

module.exports = {
  getStudent,
  getStudentById,
  getAllStudents,
  registerStudent
};