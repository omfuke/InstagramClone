const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API RUNNING"));

app.use("/api/users", require("./routes/api/login"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started"));
