require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/db");
const path = require("path");
const userroutes = require("./routes/userroutes");
// Middleware and configurations
app.use(
  cors({
    origin: "*", // Consider replacing "*" with specific domains
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "UPDATE"],
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/api", userroutes);

app.get("/", async (req, res) => {
  const welcome = "Welcome To our Ejs Site";
  res.render("welcome", { welcome }); // Corrected
});

app.get("/home", async (req, res) => {
  const message = "yashraj Singh Thakur";
  res.render("home", { message }); // Corrected
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});
