const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

const db = [
  { id: "1", author: "John Doe", text: "This company is worth every coin!" },
  {
    id: "2",
    author: "Amanda Doe",
    text: "They really know how to make you happy.",
  },
];

const randomElement = (arr) => {
  const number = Math.floor(Math.random() * arr.length);
  return number.toString();
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/testimonials", (req, res) => {
  res.json(db);
});

app.get("/testimonials/random", (req, res) => {
  const element = db[randomElement(db)];
  res.json(element);
});

app.get("/testimonials/:id", (req, res) => {
  const element = db.find((elem) => elem.id === req.params.id);
  if (element) {
    res.json(element);
  } else {
    res.json({ message: "Element not found" });
  }
});

app.post("/testimonials", (req, res) => {
  const { author, text } = req.body;

  const newElement = {
    id: uuidv4(),
    author,
    text,
  };
  db.push(newElement);
  if (author && text) {
    res.json({ message: "OK" });
  }
});

app.put("/testimonials/:id", (req, res) => {
  const { author, text } = req.body;

  const element = db.find((elem) => elem.id === req.params.id);

  if (element) {
    element.author = author;
    element.text = text;

    res.json({ message: "OK" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.delete("/testimonials/:id", (req, res) => {
  const elementIndex = db.findIndex((elem) => elem.id === req.params.id);
  if (elementIndex !== -1) {
    db.splice(elementIndex, 1);
    res.json({ message: "OK" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
