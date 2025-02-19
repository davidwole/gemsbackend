const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const db = process.env.DB_URI;

//Database Connection
mongoose
  .connect(db)
  .then(() => {
    console.log(`Connected to DB`);
    app.listen(PORT, () => {
      console.log(`App is listening on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

app.get("/connect", (req, res) => {
  res.send("Connected");
});

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/branches", require("./routes/branchRoutes"));
