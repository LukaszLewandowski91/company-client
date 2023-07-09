const express = require("express");
const socket = require("socket.io");
const path = require("path");
const cors = require("cors");
const app = express();
const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve static files from the React app
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
