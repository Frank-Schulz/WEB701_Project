const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();

const { PORT, } = process.env;

// Connect to MongoDB
require("./config/db.config")();

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
  next();
})

const userRoutes = require("./routes/user.routes");

app.use('/user', userRoutes)

app.get("/", (req, res) => {
  res.send("This is my test MEAN stacks");
});

app.listen(PORT, () => { console.log(`App started on port: ${PORT}`); });
