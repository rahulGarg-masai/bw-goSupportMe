const express = require('express');
const connectDB = require("./config/db");
const PatientRouter = require('./routes/patient.route');
const DoctorRouter = require('./routes/doctor.route');
const ConsultRouter = require('./routes/consult.route');


const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.use(PatientRouter);
app.use(DoctorRouter);
app.use(ConsultRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
