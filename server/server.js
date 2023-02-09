const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
//routes
const user = require("./routes/user");
const journal = require("./routes/journal");
const goals = require("./routes/goals");
const calendar = require("./routes/calendar");

//cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/journal", journal);
app.use("/goals", goals);
app.use("/calendar", calendar);

app.get("/", function (req, res) {
  res.send("Hello World");
});

//404 handler anything that is not a route we have will be caught by this
app.use("/", (req, res) => {
  return res.status(404).send("Page not found");
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler unknown middleware error",
    status: 500,
    message: { err: "An error occured" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
