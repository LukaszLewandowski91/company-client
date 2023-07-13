const Seat = require("../models/seat.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: "Not found" });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();
    res.json({ message: "Ok" });
    req.io.emit("seatsUpdated", await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const st = await Seat.findById(req.params.id);
    if (st) {
      st.day = day;
      st.seat = seat;
      st.client = client;
      st.email = email;

      await st.save();
      res.json({ message: "Ok" });
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const st = await Seat.findById(req.params.id);
    if (st) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: "Ok" });
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
