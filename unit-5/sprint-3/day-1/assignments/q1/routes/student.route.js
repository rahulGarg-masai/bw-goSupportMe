const express = require("express");
const StudentModel = require("../models/student.model");
const enrollmentModel = require("../models/enrollment.model");
const StudentRouter = express.Router();

StudentRouter.post("/students", async (req, res) => {
  try {
    let student = req.body;
    if (!student) {
      return res.status(400).json({ msg: "send student" });
    } else {
      let newStudent = await StudentModel.create(student);
      return res.status(200).json({ msg: "student created", newStudent });
    }
  } catch (error) {
    return res.status(400).json({ msg: "error", error });
  }
});

//return all active courses for this student
StudentRouter.get("/students/:studentId/courses", async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) {
    return res.status(400).json({ msg: "invalid student id" });
  }
  const enrollments = await enrollmentModel
    .find({ studentId, isActive: true })
    .populate("courseId");

  return res
    .status(200)
    .json({ msg: "active courses for this stdent are", enrollments });
});

StudentRouter.delete("/students/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  if (!studentId) {
    return res.status(400).json({ msg: "invalid student id" });
  } else {
    //we update the doc to make this student inactive
     await StudentModel.findByIdAndUpdate(
      studentId,
      { isActive: false },
      { new: true }
    );
    await enrollmentModel.updateMany(
        {'studentId':studentId},
        {isActive:false},
    ) 
    res.status(200).json({ msg: "student removed" });
  }
});

module.exports = StudentRouter;
