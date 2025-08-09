const express = require('express');
const connectDB = require('./config/database');
const StudentRouter = require('./routes/student.route');
const CourseRouter = require('./routes/course.route');
const EnrollRouter = require('./routes/enroll.route');

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.use(StudentRouter);
app.use(CourseRouter);
app.use(EnrollRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
