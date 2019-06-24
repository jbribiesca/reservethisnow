const mongoose = require("mongoose");
const moment = require('moment');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  member: { type: String, required: true },
  starttime: { type: Date, default: Date.now },
  endtime: { type: Date, default: function(){return moment().add(1, 'hour');} }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
