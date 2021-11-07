const express = require("express");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const routes = require("./routes");
const cors = require("cors");

const app = express();
app.set("port", process.env.PORT || 9000);
const dbOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "budget",
};

// middlewares..................
app.use(myconn(mysql, dbOptions, "single"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors.............................
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// routes.....................
app.get("/", (req, res) => {
  res.send("WLCOME TO MY API");
});

app.use("/getAllUsersRegisters", routes);
app.use("/", routes);
app.use("/createRegister", routes);
app.use("/deleteRecord", routes);
app.use("/update", routes);

// server running..................
app.listen(app.get("port"), () => {
  console.log("server runing on port", app.get("port"));
});
