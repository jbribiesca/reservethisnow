const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    if (req.user) {
      db.User
        .find({ _id: req.user._id })
        .populate({ path: "appointments", options: { sort: { 'date': -1 } } })
        .then(users => {
          res.json({ appointments: users[0].appointments });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ appointments: null });
    }
  },
  findById: function(req, res) {
    if (req.user) {
      db.User
        .find({ _id: req.user._id })
        .populate("appointments")
        .then(users => {
          const appointment = users[0].appointments.filter(b => b._id.toString() === req.params.id);
          res.json({ appointment: appointment[0] });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ appointment: null });
    }
  },
  create: function(req, res) {
    db.Appointment
      .create(req.body)
      .then(dbAppointment => {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { appointments: dbAppointment._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Appointment
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: { appointments: new ObjectId(req.params.id) } }, { new: true })
      .then(() => {
        db.Appointment
          .findOneAndDelete({ _id: req.params.id })
          .then(dbAppointment => res.json(dbAppointment))
          .catch(err => res.status(422).json(err));
      });
  }
};
