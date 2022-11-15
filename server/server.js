const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 4000;


app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})