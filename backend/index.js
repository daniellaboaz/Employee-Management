// backend/index.js
const express = require("express");
const cors = require("cors");
const { connectDb, sendQueryCommit, sendQuery } = require("./src/api/mysql");
const bodyParser = require('body-parser');

const registerRouter = require("./src/routes/register");
const register2Router = require("./src/routes/register2");
const register3Router = require("./src/routes/register3");
const taskRouter = require("./src/routes/task");

const PORT = 8082;
const app = express();

// Increase payload limit to 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json());
app.use("", registerRouter);
app.use("", register2Router);
app.use("", register3Router);
app.use("", taskRouter);

app.listen(PORT, () => {
  console.log("listening");
  connectDb()
    .then((res) => {
      console.log("connection ok, thread id: " + res);
    })
    .catch(console.error);
});