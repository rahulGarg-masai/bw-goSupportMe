const express = require("express");
const CourseModel = require("../models/course.model");
const enrollmentModel = require("../models/enrollment.model");
const CourseRouter = express.Router();

CourseRouter.post("/courses", async (req, res) => {
  try {
    let Course = req.body;
    if (!Course) {
      return res.status(400).json({ msg: "send Course" });
    } else {
      let newCourse = await CourseModel.create(Course);
      return res.status(200).json({ msg: "Course created", newCourse });
    }
  } catch (error) {
    return res.status(400).json({ msg: "error", error });
  }
});

//all active students in this course
CourseRouter.get("/courses/:courseId/students", async (req, res) => {
  let { courseId } = req.params;
  if (!courseId) {
    return res.status(400).json({ msg: "invalid course id" });
  } else {
    let enrolled = await enrollmentModel
      .find({ courseId: courseId, isActive: true })
      .populate("studentId");
    return res.status(200).json({ msg: "enrolled students are", enrolled });
  }
});

//
CourseRouter.delete("/courses/:courseId", async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) {
    return res.status(400).json({ msg: "course not found  " });
  } else {
    await CourseModel.findByIdAndUpdate(
      courseId,
      { isActive: false },
      { new: true }
    );
    await enrollmentModel.updateMany({ courseId }, { isActive: false });
    return res.status(200).json({ msg: "course removed" });
  }
});

module.exports = CourseRouter;
