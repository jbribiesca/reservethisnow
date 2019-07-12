const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../models");
const Nexmo = require("nexmo");
const moment = require("moment")


// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    if (req.user) {
      db.User
        .find({ _id: req.user._id})
        .populate({ path: "appointments", options: { sort: { 'date': -1 } } })
        .then(users => {
          res.json({ appointments: users[0].appointments });
        })
        .catch(err => res.status(422).json(err));
    } else {
      return res.json({ appointments: null });
    }
  },
  findAllDate: function (req, res) {
    if (req.user) {
      let date = new Date(req.params.date).toISOString()
      db.User
        .find({ _id: req.user._id })
        .populate({ path: "appointments",
         match: {date: date},
         options: { sort: { 'date': -1 } } })
        .then(users => {
          res.json({ appointments: users[0].appointments });
        })
        .catch(err => {console.log(err)
          res.status(422).json(err)});
    } else {
      return res.json({ appointments: null });
    }
  },
  findById: function (req, res) {
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
  findByDate: function(req, res) {
      console.log(req.body.date)
      db.Appointment
        .findOne({ date: req.body.date})
        // .populate({ path: "appointments", options: { sort: { 'date': -1 } } })
        .then(dbAppointments => {
          res.json({ appointments: dbAppointments});
        })
        .catch(err => res.status(422).json(err));

  },
  
  create: function(req, res) {
    db.Appointment
      // console.log(req.body)
      .create(req.body)
      .then(dbAppointment => {
        const nexmo = new Nexmo({
          apiKey: "05f90f67",
          apiSecret: "rFVLUG2N3ml7U1Nw"
        });
        let msg = req.body.client + " you are confirmed for your " + req.body.title + " on " + moment(req.body.date).format("MMMM Do YYYY").toString()
    
        const from = "17149885310";
        const to = req.body.phone;
    
        nexmo.message.sendSms(from, to, msg, (err, responseData) => {
          if (err) {
            console.log(err)
          } else {
            console.dir(responseData)
          }
        })
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { appointments: dbAppointment._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },
  clientCreate: function(req, res) {
    db.Appointment
      // console.log(req.body)
      .create(req.body)
      .then(dbAppointment => {
        const nexmo = new Nexmo({
          apiKey: "05f90f67",
          apiSecret: "rFVLUG2N3ml7U1Nw"
        });
        let msg = req.body.client + " you are confirmed for your " + req.body.title + " on " + moment(req.body.date).format("MMMM Do YYYY").toString() + " at " + req.body.time
    
        const from = "17149885310";
        const to = req.body.phone;
    
        nexmo.message.sendSms(from, to, msg, (err, responseData) => {
          if (err) {
            console.log(err)
          } else {
            console.dir(responseData)
          }
        })
        return db.User.findOneAndUpdate({ _id: req.body.id }, { $push: { appointments: dbAppointment._id } }, { new: true });
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
