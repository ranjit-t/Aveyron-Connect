const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

const connection = mysql.createConnection({
  host: "sql876.main-hosting.eu",
  user: "u739334147_root",
  password: "Focusranjith@1",
  database: "u739334147_aveyron",
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");

  app.post("/signupdata", (req, res) => {
    const { displayName, email, password } = req.body;

    const checkQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(checkQuery, [email], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Error checking email:", checkErr);
        res.status(500).send("Internal server error");
        return;
      }

      if (checkResult.length > 0) {
        res.status(400).send("Email already exists");
        return;
      }

      const insertQuery = "INSERT INTO users SET ?";
      const newUser = { displayName, email, password };

      connection.query(insertQuery, newUser, (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting new user:", insertErr);
          res.status(500).send("Internal server error");
          return;
        }

        console.log("New user inserted successfully!");
        console.log(insertResult);

        res.status(200).send("User created successfully");
      });
    });
  });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
