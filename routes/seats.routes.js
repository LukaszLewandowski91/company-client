const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const db = require("./../db");

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats/:id").get((req, res) => {
  const element = db.seats.find((elem) => elem.id === req.params.id);
  if (element) {
    res.json(element);
  } else {
    res.json({ message: "Element not found" });
  }
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;

  const newElement = {
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  };

  if (day && seat && client && email) {
    db.seats.push(newElement);
    res.json({ message: "OK" });
  } else {
    res.status(200).json({ message: "Error validation" });
  }
});

router.route("/seats/:id").put((req, res) => {
  const { day, seat, client, email } = req.body;

  const element = db.seats.find((elem) => elem.id === req.params.id);
  if (day && seat && client && email) {
    if (element) {
      element.day = day;
      element.seat = seat;
      element.client = client;
      element.email = email;

      res.json({ message: "OK" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } else {
    res.status(200).json({ message: "Error validation" });
  }
});

router.route("/seats/:id").delete((req, res) => {
  const elementIndex = db.seats.findIndex((elem) => elem.id === req.params.id);
  if (elementIndex !== -1) {
    db.seats.splice(elementIndex, 1);
    res.json({ message: "OK" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
