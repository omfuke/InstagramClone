const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const post = require("./routes/api/post");
const profile = require("./routes/api/profile");
// const path = require("path");

connectDB();

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/post", post);

// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT);
