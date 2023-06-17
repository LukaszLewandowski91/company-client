const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const db = require("./../db");

router.route("/concerts").get((req, res) => {
  res.json(db.concerts);
});

router.route("/concerts/:id").get((req, res) => {
  const element = db.concerts.find((elem) => elem.id === req.params.id);
  if (element) {
    res.json(element);
  } else {
    res.json({ message: "Element not found" });
  }
});

router.route("/concerts").post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  const newElement = {
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image,
  };

  if (performer && genre && price && day && image) {
    db.concerts.push(newElement);
    res.json({ message: "OK" });
  } else {
    res.status(200).json({ message: "Error validation" });
  }
});

router.route("/concerts/:id").put((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  const element = db.concerts.find((elem) => elem.id === req.params.id);

  if (performer && genre && price && day && image) {
    if (element) {
      element.performer = performer;
      element.genre = genre;
      element.price = price;
      element.day = day;
      element.image = image;

      res.json({ message: "OK" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } else {
    res.status(200).json({ message: "Error validation" });
  }
});

router.route("/concerts/:id").delete((req, res) => {
  const elementIndex = db.concerts.findIndex(
    (elem) => elem.id === req.params.id
  );
  if (elementIndex !== -1) {
    db.concerts.splice(elementIndex, 1);
    res.json({ message: "OK" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
