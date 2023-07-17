const express = require("express");
const socket = require("socket.io");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");
const uri =
  "mongodb+srv://lukasz:Kodilla2023@cluster0.sjmpwid.mongodb.net/NewWaveDB?retryWrites=true&w=majority";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve static files from the React app
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(express.static(path.join(__dirname, "/client/build")));
app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = "";

if (NODE_ENV === "production") dbUri = uri;
else if (NODE_ENV === "test") dbUri = "mongodb://localhost:27017/NewWaveDBtest";
else dbUri = "mongodb://localhost:27017/NewWaveDB";

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});

db.on("error", (err) => console.log("Error " + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

const io = socket(server);
io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnect`);
  });
});

module.exports = server;
