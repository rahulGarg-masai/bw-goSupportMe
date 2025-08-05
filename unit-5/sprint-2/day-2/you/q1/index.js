const express = require("express");
const connectToDb = require("./config/database");
const TaskRouter = require("./routes/taskRoutes");

connectToDb();



const app = express();
app.use(express.json());
app.use("/tasks",TaskRouter);
app.listen(3000, () => {
    console.log('server started..');
});


