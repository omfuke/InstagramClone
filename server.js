const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
// const path = require("path");
const dotenv = require("dotenv");
connectDB();

app.use(cors());
dotenv.config();

app.use(express.json({ extended: false }));
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  return res.json({ hello: "om" });
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started"));
