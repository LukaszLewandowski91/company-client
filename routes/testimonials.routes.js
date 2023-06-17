const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const db = require("./../db");

const randomElement = (arr) => {
  const number = Math.floor(Math.random() * arr.length);
  return number.toString();
};

router.route("/testimonials").get((req, res) => {
  res.json(db.testimonials);
});

router.route("/testimonials/random").get((req, res) => {
  const element = db.testimonials[randomElement(db.testimonials)];
  res.json(element);
});

router.route("/testimonials/:id").get((req, res) => {
  const element = db.testimonials.find((elem) => elem.id === req.params.id);
  if (element) {
    res.json(element);
  } else {
    res.json({ message: "Element not found" });
  }
});

router.route("/testimonials").post((req, res) => {
  const { author, text } = req.body;

  const newElement = {
    id: uuidv4(),
    author,
    text,
  };

  if (author && text) {
    db.testimonials.push(newElement);
    res.json({ message: "OK" });
  } else {
    res.status(200).json({ message: "Error validation" });
  }
});

router.route("/testimonials/:id").put((req, res) => {
  const { author, text } = req.body;

  const element = db.testimonials.find((elem) => elem.id === req.params.id);
  if (author && text) {
    if (element) {
      element.author = author;
      element.text = text;

      res.json({ message: "OK" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } else {
    res.status(200).json({ message: "Error validation" });
  }
});

router.route("/testimonials/:id").delete((req, res) => {
  const elementIndex = db.testimonials.findIndex(
    (elem) => elem.id === req.params.id
  );
  if (elementIndex !== -1) {
    db.testimonials.splice(elementIndex, 1);
    res.json({ message: "OK" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
