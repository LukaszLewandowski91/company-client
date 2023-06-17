const express = require("express");

const app = express();
const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", testimonialsRoutes);
app.use("/", concertsRoutes);
app.use("/", seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
