const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 4000;
//routes
const user = require("./routes/user");
const journal = require("./routes/journal");
const goals = require("./routes/goals");
const calendar = require("./routes/calendar");

app.use(cors());

app.use("/user", user);
app.use("/journal", journal);
app.use("/goals", goals);
app.use("/calendar", calendar);

app.get('/', function (req, res) {
  res.send('Hello World')
})




app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})