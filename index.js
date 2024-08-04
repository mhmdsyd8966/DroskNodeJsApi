const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const AuthRouter = require("./Routes/AuthRoutes");
const PackageRouter = require("./Routes/PackageRouter");
const TransactionRouter = require("./Routes/TransactionRouter");
const LessonRouter = require("./Routes/LessonRouter");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/packages", PackageRouter);
app.use("/api/v1/transaction", TransactionRouter);
app.use("/api/v1/", LessonRouter);

const DbConfig = require("./Config/Database-config");

mongoose
  .connect(DbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongo!!"))
  .catch((err) => {
    console.log(`failed to connect to database ${err.message}`);
    process.exit(1);
  });
app.listen(3000, () => console.log("app listening on port 3000..."));
